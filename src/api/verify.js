import supabase from '../../../config/supabase';

export default async function handler(req, res) {
  const { token_hash, type, email } = req.query;

  if (!token_hash || !type || !email) {
    return res.redirect('/auth/error?message=Invalid verification link');
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: token_hash,
      type: type === 'email' ? 'signup' : type
    });

    if (error) throw error;

    // Redirect to confirmation page with success message
    return res.redirect(`${window.location.origin}/auth/confirm?verified=true`);
  } catch (error) {
    console.error('Verification error:', error.message);
    return res.redirect(`${window.location.origin}/auth/error?message=${encodeURIComponent(error.message)}`);
  }
}