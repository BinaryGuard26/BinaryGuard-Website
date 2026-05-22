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

interface OtpVerifyProps {
  onNavigate: (page: Page) => void;
}

export default function OtpVerify({ onNavigate }: OtpVerifyProps) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('access_card_verified_email') || '';
    setEmail(savedEmail);

    if (!savedEmail) {
      onNavigate('access-card-login');
    }
  }, [onNavigate]);

  const handleVerifyOtp = async () => {
    setError('');
    setMessage('');

    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp.trim(),
        type: 'email',
      });

      if (error) {
        setError('Invalid or expired OTP. Please try again or resend the OTP.');
        return;
      }

      onNavigate('access-card-order-form');
    } catch {
      setError('Unable to verify OTP right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setMessage('');

    try {
      setIsResending(true);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage('A new OTP has been sent to your email.');
    } catch {
      setError('Unable to resend OTP right now. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Products.jpg"
            alt="OTP Verification Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950" />
        </div>

        <div className="relative w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
          <p className="text-cyan-400 font-semibold uppercase tracking-wide text-sm mb-3">
            OTP Verify Page
          </p>

          <h1 className="text-4xl font-bold mb-5">Enter Verification Code</h1>

          <p className="text-slate-300 leading-relaxed mb-8">
            We sent a 6-digit OTP to <span className="text-white font-semibold">{email}</span>.
            Enter the code below to continue to the access card order form.
          </p>

          <label className="block text-sm text-slate-300 mb-3">6-Digit OTP</label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleVerifyOtp();
            }}
            placeholder="000000"
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white tracking-[0.5em] text-center placeholder:tracking-normal placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 mb-4"
          />

          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          <button
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 text-slate-950 font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            onClick={handleResendOtp}
            disabled={isResending}
            className="mt-5 w-full border border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 font-semibold py-4 rounded-2xl transition-all duration-300"
          >
            {isResending ? 'Resending...' : 'Resend OTP'}
          </button>

          <button
            onClick={() => onNavigate('access-card-login')}
            className="mt-6 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
          >
            Use a different email
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
