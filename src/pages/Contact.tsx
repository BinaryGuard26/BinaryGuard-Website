import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

interface ContactForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      return;
    }

    try {
      setStatus('loading');

      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: form.name,
            company: form.company || null,
            email: form.email,
            phone: form.phone || null,
            subject: form.subject,
            message: form.message,
          },
        ]);

      if (dbError) {
        console.error('Database Error:', dbError);
        setStatus('error');
        return;
      }

      const { error: functionError } = await supabase.functions.invoke(
        'send-contact-email',
        {
          body: {
            full_name: form.name,
            company_name: form.company,
            email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
          },
        }
      );

      if (functionError) {
        console.error('Function Error:', functionError);
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      console.error('Unexpected Error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#030d1f] min-h-screen flex flex-col">
      <section className="relative flex-1 pt-16 min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Contact_Us.jpg"
            alt="Contact BinaryGuard"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#020b1a]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020b1a]/95 via-[#020b1a]/70 to-[#020b1a]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <span className="inline-block border border-white/25 text-white/75 text-xs tracking-[0.22em] px-3 py-1.5 mb-10">
            CONTACT US
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-5">
                Let&apos;s talk about your
                <span className="block text-cyan-400">security and IT needs</span>
              </h1>

              <p className="text-gray-200/95 text-lg leading-8 mb-8">
                Tell us what you need and our team will get back to you with the right
                solution, support options, or next steps for your business.
              </p>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/15 text-cyan-300 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Talk to our team</p>
                    <p className="text-gray-300 text-sm mt-1">Discuss support, installations, networking, CCTV, and integrated security systems.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/15 text-cyan-300 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Clear response process</p>
                    <p className="text-gray-300 text-sm mt-1">Share your requirement once and we will follow up with the right contact and service path.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/15 text-cyan-300 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Fast project intake</p>
                    <p className="text-gray-300 text-sm mt-1">The form collects just enough detail so we can respond quickly without making it complicated.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 md:p-8 shadow-2xl shadow-cyan-950/20">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center min-h-[420px]">
                  <CheckCircle size={56} className="text-green-400 mb-4" />
                  <h3 className="text-white font-bold text-2xl mb-2">Request received</h3>
                  <p className="text-gray-300 text-sm max-w-sm mb-6">
                    Thank you for contacting BinaryGuard. Our team will review your request and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Business or organization"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">Email Address <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Your contact number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Subject <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-200 text-sm font-medium mb-2">Leave a Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-xl bg-white/95 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3">
                      <AlertCircle size={16} />
                      <span>Failed to send your message. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : <>Send Request <Send size={16} /></>}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Your information is secure and used only to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
