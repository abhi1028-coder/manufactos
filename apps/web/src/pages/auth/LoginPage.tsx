import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { sendOtp, verifyOtp } from '../../store/authSlice';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((s) => s.auth);

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(sendOtp(phone));
    if (sendOtp.fulfilled.match(result)) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(verifyOtp({ phone, otp }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-1">
        {step === 'phone' ? 'Sign in to your account' : 'Enter verification code'}
      </h2>
      <p className="text-indigo-300 text-sm mb-6">
        {step === 'phone'
          ? 'We\'ll send a 6-digit OTP to your registered mobile number.'
          : `OTP sent to +91 ${phone}. Valid for 10 minutes.`}
      </p>

      {step === 'phone' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1.5">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-indigo-400/40 bg-white/10 text-indigo-200 text-sm">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98765 43210"
                required
                pattern="\d{10}"
                className="flex-1 rounded-r-lg border border-indigo-400/40 bg-white/10 px-3 py-2.5 text-white placeholder-indigo-300/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm bg-red-900/30 rounded-lg px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={isLoading || phone.length !== 10} className="btn-primary w-full justify-center py-2.5">
            {isLoading ? 'Sending OTP…' : 'Send OTP'}
          </button>

          {/* Demo hint */}
          <p className="text-center text-xs text-indigo-400 mt-2">
            Demo: use any 10-digit number. OTP will be <strong className="text-indigo-300">123456</strong>.
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1.5">
              6-Digit OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="• • • • • •"
              required
              pattern="\d{6}"
              className="w-full rounded-lg border border-indigo-400/40 bg-white/10 px-3 py-2.5 text-white placeholder-indigo-300/60 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && (
            <p className="text-red-300 text-sm bg-red-900/30 rounded-lg px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={isLoading || otp.length !== 6} className="btn-primary w-full justify-center py-2.5">
            {isLoading ? 'Verifying…' : 'Verify & Sign In'}
          </button>

          <button
            type="button"
            onClick={() => { setStep('phone'); setOtp(''); }}
            className="w-full text-center text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            ← Change number
          </button>
        </form>
      )}
    </div>
  );
}
