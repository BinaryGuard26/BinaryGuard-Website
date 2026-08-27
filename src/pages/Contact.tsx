import { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Headphones,
  CalendarDays,
  Video,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

interface ContactForm {
  name: string;
  company: string;
  businessType: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const businessTypes = [
  'Federal Government',
  'Provincial Government',
  'Municipality',
  'School Division',
  'University',
  'Hospital',
  'Residential',
  'Retail Store',
  'Department Store',
  'Banks',
  'Grocery Chain',
  'Manufacturing Facility',
  'Other',
];

const consultationTypes = [
  '30-Minute Security Consultation',
  '30-Minute IT Infrastructure Consultation',
  '30-Minute Security & IT Consultation',
  'Project Discovery Meeting',
];

const calendarCells = [
  { day: 26, muted: true },
  { day: 27, muted: true },
  { day: 28, muted: true },
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 31, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15, weekendAccent: true },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22, weekendAccent: true },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29, weekendAccent: true },
  { day: 30 },
  { day: 31 },
  { day: 1, muted: true },
  { day: 2, muted: true },
  { day: 3, muted: true },
  { day: 4, muted: true },
  { day: 5, muted: true },
];

const availableTimes = ['10:00 AM', '1:30 PM', '3:00 PM'];

const initialForm: ContactForm = {
  name: '',
  company: '',
  businessType: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [consultationType, setConsultationType] = useState(consultationTypes[0]);
  const [selectedDate, setSelectedDate] = useState(19);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const bookingsUrl = String(import.meta.env.VITE_MICROSOFT_BOOKINGS_URL || '').trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.company || !form.email || !form.phone || !form.businessType || !form.message) {
      return;
    }

    try {
      setStatus('loading');

      const apiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          businessType: form.businessType,
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      let data: { success?: boolean; message?: string } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Contact request failed (${response.status})`);
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      console.error('Unexpected contact form error:', err);
      setStatus('error');
    }
  };

  const openBookings = () => {
    if (!bookingsUrl) return;

    const url = new URL(bookingsUrl, window.location.origin);
    url.searchParams.set('consultationType', consultationType);
    url.searchParams.set('date', `2026-08-${String(selectedDate).padStart(2, '0')}`);
    url.searchParams.set('time', selectedTime);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#030d1f] text-white flex flex-col">
      <section className="relative flex-1 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/Contact_Us.jpg"
            alt="BinaryGuard contact and consultation"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#020814]/88" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(25,82,180,.15),transparent_34%),linear-gradient(90deg,rgba(2,8,20,.94),rgba(2,8,20,.76),rgba(2,8,20,.92))]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1450px] px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pt-12">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-black tracking-[-0.025em] text-white md:text-5xl lg:text-[58px]">
              Let&apos;s Talk About Your Security &amp; IT Needs
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
              Book a Microsoft Teams consultation instantly using Microsoft Bookings,
              or send us a message and our team will contact you shortly.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <div className="rounded-2xl border border-blue-400/25 bg-[#071427]/82 p-5 shadow-[0_18px_70px_rgba(0,0,0,.35)] backdrop-blur-md md:p-7">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_28px_rgba(34,211,238,.22)]">
                  <Mail size={27} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  <p className="mt-1 text-sm text-slate-400">Fill out the form and our team will get back to you.</p>
                </div>
              </div>

              {status === 'success' ? (
                <div className="flex min-h-[490px] flex-col items-center justify-center text-center">
                  <CheckCircle size={58} className="mb-4 text-green-400" />
                  <h3 className="text-2xl font-bold">Request received</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                    Thank you for contacting BinaryGuard. Our team will review your request and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 font-semibold transition hover:bg-cyan-400"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-200">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-200">
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                        placeholder="Enter your company name"
                        className="w-full rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                      Business Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="businessType"
                      value={form.businessType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-blue-300/30 bg-[#071426] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="" disabled>Select business type</option>
                      {businessTypes.map((businessType) => (
                        <option key={businessType} value={businessType}>{businessType}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-200">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                        className="w-full rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-200">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className="w-full rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                      Leave a Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your security or IT needs..."
                      className="w-full resize-none rounded-lg border border-blue-300/30 bg-[#071426]/85 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle size={16} />
                      <span>Failed to send your message. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,.18)] transition hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending...' : <>Send Message <Send size={17} /></>}
                  </button>

                  <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                    <ShieldCheck size={14} />
                    Your information is secure and used only to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>

            <div className="rounded-2xl border border-[#284a79] bg-[#071a34]/90 p-5 shadow-[0_18px_70px_rgba(0,0,0,.38)] backdrop-blur-md md:p-7">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-500 shadow-[0_0_30px_rgba(139,92,246,.28)]">
                  <Video size={30} />
                </div>
                <div>
                  <h2 className="text-[24px] font-bold leading-tight">Book a Microsoft Teams Consultation</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Choose a convenient time to speak with one of our security specialists.
                  </p>
                </div>
              </div>

              <select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
                className="w-full rounded-md border border-[#375b8f] bg-[#081b35] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              >
                {consultationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.08fr_.92fr]">
                <div className="lg:border-r lg:border-white/20 lg:pr-5">
                  <div className="mb-4 flex items-center justify-between">
                    <button type="button" aria-label="Previous month" className="text-slate-300 transition hover:text-white">
                      <ChevronLeft size={22} />
                    </button>
                    <p className="text-xl font-semibold">August 2026</p>
                    <button type="button" aria-label="Next month" className="text-slate-300 transition hover:text-white">
                      <ChevronRight size={22} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-slate-300">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                      <div key={day} className="py-1 font-medium">{day}</div>
                    ))}

                    {calendarCells.map((cell, index) => {
                      const isCurrentMonth = !cell.muted;
                      const isSelected = isCurrentMonth && cell.day === selectedDate;

                      return (
                        <button
                          type="button"
                          key={`${cell.day}-${index}`}
                          disabled={!isCurrentMonth}
                          onClick={() => isCurrentMonth && setSelectedDate(cell.day)}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                            isSelected
                              ? 'bg-gradient-to-br from-violet-500 to-purple-600 font-bold text-white shadow-[0_0_18px_rgba(168,85,247,.45)]'
                              : cell.muted
                                ? 'cursor-default text-slate-600'
                                : cell.weekendAccent
                                  ? 'text-blue-400 hover:bg-white/5'
                                  : 'text-slate-100 hover:bg-white/5'
                          }`}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-center text-lg font-medium">Available Times</p>
                  <div className="space-y-3">
                    {availableTimes.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`w-full rounded-md border px-4 py-3 text-base font-medium transition ${
                            isSelected
                              ? 'border-violet-400 bg-violet-500/15 text-white shadow-[0_0_16px_rgba(139,92,246,.18)]'
                              : 'border-violet-400/70 bg-[#081b35] text-white hover:bg-violet-500/10'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={openBookings}
                    disabled={!bookingsUrl}
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-500 px-4 py-3.5 text-base font-semibold text-white shadow-[0_0_22px_rgba(139,92,246,.28)] transition hover:from-violet-500 hover:to-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CalendarDays size={20} />
                    Continue Booking
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="flex items-center justify-center gap-3 text-center text-sm text-slate-400">
                  <ShieldCheck size={18} className="shrink-0 text-slate-300" />
                  Confirmation and Teams meeting link will be emailed automatically.
                </p>
                {!bookingsUrl && (
                  <p className="mt-3 text-center text-xs leading-5 text-amber-300/90">
                    Add VITE_MICROSOFT_BOOKINGS_URL in DigitalOcean to enable Continue Booking.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl border border-blue-400/20 bg-[#071427]/82 backdrop-blur-md md:grid-cols-3">
            <a href="tel:+12045045000" className="flex items-center gap-4 border-b border-white/10 p-5 transition hover:bg-white/[0.04] md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Phone size={23} />
              </div>
              <div>
                <p className="font-semibold text-white">Call Us</p>
                <p className="text-blue-300">+1 204-504-5000</p>
              </div>
            </a>

            <a href="mailto:admin@binaryguard.ca" className="flex items-center gap-4 border-b border-white/10 p-5 transition hover:bg-white/[0.04] md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Mail size={23} />
              </div>
              <div>
                <p className="font-semibold text-white">Email Us</p>
                <p className="text-blue-300">admin@binaryguard.ca</p>
              </div>
            </a>

            <a href="tel:+12045045000" className="flex items-center gap-4 p-5 transition hover:bg-white/[0.04]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Headphones size={23} />
              </div>
              <div>
                <p className="font-semibold text-white">Technical Support</p>
                <p className="text-blue-300">+1 204-504-5000</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
