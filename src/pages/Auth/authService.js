import supabase from "../../config/supabase"

export const authService = {
  async sendMagicLink(email) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_SITE_URL}/auth/confirm`,
      }
    })

    if (error) throw error
    return data
  },

  async verifyOtp(email, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })

    if (error) throw error
    return data
  }
}