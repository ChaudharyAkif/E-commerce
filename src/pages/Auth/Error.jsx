import { useSearchParams } from 'react-router-dom';

export default function VerificationError() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="verification-container">
      <h1>❌ Verification Failed</h1>
      <p>{message || 'An unknown error occurred during verification.'}</p>
      <a href="/signup" className="btn-primary">Try Again</a>
    </div>
  );
}