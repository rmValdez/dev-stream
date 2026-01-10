'use client';

import { FormEvent } from 'react';
import Link from 'next/link';

interface ForgotPasswordPageProps {
  email: string;
  setEmail: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string;
}

export default function ForgotPasswordPage({
  email,
  setEmail,
  handleSubmit,
  isLoading,
  error,
  successMessage,
}: ForgotPasswordPageProps) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo logo-reset">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1>Forgot Password?</h1>
          <p>No worries, we&apos;ll send you reset instructions</p>
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
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Sending...
              </>
            ) : (
              'Send Reset OTP'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link href="/login">← Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
