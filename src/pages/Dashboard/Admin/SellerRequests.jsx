import { Table, Button, message, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import supabase from "../../../config/supabase";
import { useAuthcontext } from "../../../context/Auth";

export default function SellerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const { user } = useAuthcontext(); // Access user from AuthContext

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("users")
        .select("id, firstName, email, created_at, seller_status")
        .order("created_at", { ascending: true });

      // Show all for admin, only pending for others
      if (user?.role === "admin") {
        query = query.in("seller_status", ["pending", "approved", "rejected"]);
      } else {
        query = query.eq("seller_status", "pending");
      }

      const { data, error } = await query;
      if (error) throw error;

      setRequests(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Could not fetch seller requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role) {
      fetchRequests();
    }
  }, [user]);

  const handleAction = async (email, decision) => {
    setActionLoading(email);
    try {
      const updateData = {
        seller_status: decision === "approved" ? "approved" : "rejected",
        role: decision === "approved" ? "seller" : "user",
      };

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("email", email);

      if (error) throw error;

      message.success(`Request ${decision}!`);
      await fetchRequests();
    } catch (error) {
      console.error("Update error:", error);
      message.error(`Failed to ${decision} request.`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "seller_status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "pending") color = "orange";
        if (status === "approved") color = "green";
        if (status === "rejected") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Request Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.seller_status === "pending" ? (
            <>
              <Button
                type="primary"
                onClick={() => handleAction(record.email, "approved")}
                loading={actionLoading === record.email}
                disabled={actionLoading !== null}
              >
                Approve
              </Button>
              <Button
                danger
                onClick={() => handleAction(record.email, "rejected")}
                loading={actionLoading === record.email}
                disabled={actionLoading !== null}
              >
                Reject
              </Button>
            </>
          ) : (
            user?.role === "admin" && (
              <Tag>
                {record.seller_status === "approved"
                  ? "Approved"
                  : "Rejected"}
              </Tag>
            )
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === "admin" ? "All Seller Requests" : "Pending Seller Requests"}
      </h2>
      <Table
        rowKey="email"
        columns={columns}
        dataSource={requests}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
}
