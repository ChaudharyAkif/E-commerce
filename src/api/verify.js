import supabase from '../../../config/supabase';

export default async function handler(req, res) {
  const { token_hash, type, email } = req.query;

  if (!token_hash || !type || !email) {
    return res.redirect('/auth/error?message=Missing parameters');
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: token_hash,
      type: type === 'email' ? 'signup' : type
    });

    if (error) throw error;

    return res.redirect('/auth/confirm');
  } catch (error) {
    console.error('Verification error:', error.message);
    return res.redirect(`/auth/error?message=${encodeURIComponent(error.message)}`);
  }
}