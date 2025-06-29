import { Input, Button, Typography, ConfigProvider, message } from "antd";
import { useAuthcontext } from "../../../context/Auth";
import { useState, useEffect } from "react";
import supabase from "../../../config/supabase";

const { Title, Text } = Typography;

export default function EditProfile() {
  const { user } = useAuthcontext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟡 Load existing address
  useEffect(() => {
    const fetchAddress = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("address")
        .eq("email", user.email)
        .single();

      if (data) setAddress(data.address || "");
    };

    if (user) fetchAddress();
  }, [user]);

  // 🟢 Handle password change
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return message.error("Please fill in all fields");
    }

    if (newPassword !== confirmPassword) {
      return message.error("New passwords do not match");
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      setLoading(false);
      return message.error("Current password is incorrect");
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (updateError) return message.error("Failed to update password");

    message.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // 🔵 Handle address save
  const handleSaveAddress = async () => {
    if (!address.trim()) return message.error("Address cannot be empty");

    const { error } = await supabase
      .from("users")
      .update({ address })
      .eq("email", user.email);

    if (error) return message.error("Failed to update address");

    message.success("Address updated successfully");
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 md:p-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 text-sm">
        <div className="mb-8">
          <Text strong className="text-base mb-2 block">Manage My Account</Text>
          <ul className="space-y-2">
            <li className="text-red-500 font-medium">My Profile</li>
            <li className="text-gray-400">Address Book</li>
            <li className="text-gray-400">My Payment Options</li>
          </ul>
        </div>
        <div className="mb-8">
          <Text strong className="text-base mb-2 block">My Orders</Text>
          <ul className="space-y-2">
            <li className="text-gray-400">My Returns</li>
            <li className="text-gray-400">My Cancellations</li>
          </ul>
        </div>
        <div>
          <Text strong className="text-base mb-2 block">My Wishlist</Text>
        </div>
      </div>

      <ConfigProvider
        theme={{
          token: { colorPrimary: '#00b96b' },
          components: { Input: { colorTextPlaceholder: '#7e7c7c' } },
        }}
      >
        <div className="w-full md:w-3/4 bg-white rounded shadow p-6">
          <Title level={4} className="!text-red-500 mb-6">Edit Your Profile</Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Text>First Name</Text>
              <Input placeholder={user.firstName || ""} disabled />
            </div>
            <div>
              <Text>Last Name</Text>
              <Input placeholder={user.lastName || ""} disabled />
            </div>
            <div>
              <Text>Email</Text>
              <Input placeholder={user.email || ""} disabled />
            </div>
            <div>
              <Text>Address</Text>
              <Input
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                type="primary"
                className="mt-2"
                onClick={handleSaveAddress}
              >
                Save Address
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Text>Password Changes</Text>
            <div className="flex flex-col gap-4 mt-2">
              <Input.Password
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input.Password
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center gap-4">
            <Button
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleChangePassword}
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}
