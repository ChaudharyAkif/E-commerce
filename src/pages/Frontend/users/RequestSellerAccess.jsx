import { Button, message } from "antd";
import { useState, useEffect } from "react";
import supabase from "../../../config/supabase";

export default function RequestSellerAccess() {
  const [userEmail, setUserEmail] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        setLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) throw new Error("User not found");

        setUserEmail(user.email);

        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("seller_status")
          .eq("email", user.email)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            email: user.email,
            firstName: user.user_metadata?.name || "No Name",
            role: "user",
            uid: user.id,
            seller_status: "none",
            seller_info: "{}", // optional
          });

          if (insertError) throw insertError;
        } else if (existingUser.seller_status === "pending") {
          setIsPending(true);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        message.error("Error checking your seller status");
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  const handleRequest = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("users")
        .update({ seller_status: "pending" })
        .eq("email", userEmail);

      if (error) throw error;

      message.success("Seller request submitted for review!");
      setIsPending(true);
    } catch (error) {
      console.error("Request error:", error);
      message.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="mt-4">
      <Button
        type="primary"
        onClick={handleRequest}
        disabled={isPending || loading}
        loading={loading}
      >
        {isPending ? "Request Pending Approval" : "Apply for Seller Account"}
      </Button>
    </div>
  );
}
