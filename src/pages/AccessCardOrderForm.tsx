import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'contact'
  | 'solutions'
  | 'access-card-login'
  | 'otp-verify'
  | 'access-card-order-form';

interface AccessCardOrderFormProps {
  onNavigate: (page: Page) => void;
}

export default function AccessCardOrderForm({ onNavigate }: AccessCardOrderFormProps) {
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    designation: '',
    contact_number: '',
    site_building: '',
    po_number: '',
    card_type: '',
    quantity: '1',
    delivery_address: '',
    remarks: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        onNavigate('access-card-login');
        return;
      }

      setVerifiedEmail(user.email);
    };

    loadUser();
  }, [onNavigate]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setStatus('Your session has expired. Please verify your email again.');
      onNavigate('access-card-login');
      return;
    }

    const cancelToken = crypto.randomUUID();

    const { error } = await supabase.from('access_card_orders').insert({
      email: user.email,
      verified_domain: user.email.split('@')[1],
      full_name: form.full_name,
      designation: form.designation,
      contact_number: form.contact_number,
      site_building: form.site_building,
      po_number: form.po_number,
      card_type: form.card_type,
      quantity: Number(form.quantity),
      delivery_address: form.delivery_address,
      remarks: form.remarks,
      status: 'pending',
      cancel_token: cancelToken,
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus('Your access card order request has been submitted successfully.');
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <p className="text-cyan-400 font-semibold uppercase tracking-wide text-sm mb-3">
            Access Card Order Form
          </p>

          <h1 className="text-4xl font-bold mb-8">Submit Access Card Request</h1>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-2">Verified Email</label>
              <input
                value={verifiedEmail}
                disabled
                className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-2">
                This email is locked from the authenticated OTP session and cannot be edited.
              </p>
            </div>

            <input required placeholder="Full Name" value={form.full_name} onChange={(e) => updateField('full_name', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <input required placeholder="Designation" value={form.designation} onChange={(e) => updateField('designation', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <input required placeholder="Contact Number" value={form.contact_number} onChange={(e) => updateField('contact_number', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <input required placeholder="Site / Building" value={form.site_building} onChange={(e) => updateField('site_building', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <input required placeholder="PO Number" value={form.po_number} onChange={(e) => updateField('po_number', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <select required value={form.card_type} onChange={(e) => updateField('card_type', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white">
              <option value="">Select Card Type</option>
              <option value="tenant-card">Tenant Card</option>
              <option value="contractor-fob">Contractor FOB</option>
              <option value="replacement-card">Replacement Card</option>
            </select>
            <input required type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />
            <input placeholder="Remarks" value={form.remarks} onChange={(e) => updateField('remarks', e.target.value)} className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />

            <textarea required placeholder="Delivery Address" value={form.delivery_address} onChange={(e) => updateField('delivery_address', e.target.value)} className="md:col-span-2 min-h-32 bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white" />

            {status && (
              <p className="md:col-span-2 text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-4 py-3">
                {status}
              </p>
            )}

            <button className="md:col-span-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
