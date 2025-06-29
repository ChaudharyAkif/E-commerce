import supabase from "../config/supabase";

export const sendToBuyNowAPI = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData]);

  if (error) {
    console.error('Order insert failed:', error.message);
    return { success: false, error };
  }

  return { success: true, data };
};
