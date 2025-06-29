export default function VerificationSuccess() {
  return (
    <div className="verification-container">
      <h1>🎉 Email Verified Successfully!</h1>
      <p>Your account has been verified. You can now sign in.</p>
      <a href="/login" className="btn-primary">Go to Login</a>
    </div>
  );
}