'use client';

import { FormEvent, KeyboardEvent, ClipboardEvent, MutableRefObject } from 'react';
import Link from 'next/link';

interface VerifyEmailPageProps {
  otp: string[];
  setOtp: (value: string[]) => void;
  resendCooldown: number;
  successMessage: string;
  inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e?: FormEvent, otpCode?: string) => void;
  handleResend: () => void;
  isLoading: boolean;
  error: string | null;
  pendingEmail: string | null;
}

export default function VerifyEmailPage({
  otp,
  resendCooldown,
  successMessage,
  inputRefs,
  handleChange,
  handleKeyDown,
  handlePaste,
  handleSubmit,
  handleResend,
  isLoading,
  error,
  pendingEmail,
}: VerifyEmailPageProps) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo logo-email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1>Verify Your Email</h1>
          <p>We sent a 6-digit code to</p>
          <p className="email-highlight">{pendingEmail}</p>
        </div>

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="otp-input"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || otp.join('').length !== 6}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div className="resend-section">
          <p>Didn&apos;t receive the code?</p>
          <button
            type="button"
            className="btn-text"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isLoading}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            <Link href="/register">← Back to Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
