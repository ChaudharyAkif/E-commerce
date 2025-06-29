import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../../assets/images/signup.jpg";
import { useState } from "react";
import supabase from "../../../config/supabase";

const initialState = { firstName: "", email: "", password: "" };

export default function SignUp() {
  const [state, setState] = useState(initialState);
  const [isApploading, setIsApploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { firstName, email, password } = state;

    const fields = [
      { value: firstName, message: "Please enter a valid name." },
      { value: email, message: "Please enter a valid email address." },
      { value: password, message: "Please enter a valid password." },
    ];
    for (const { value, message } of fields) {
      if (!value) return window.MessageAlert(message, "error");
    }

    setIsApploading(true);

    // Sign up user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          role: "client", // Optional: Save role in metadata
        },
      },
    });

    if (error) {
      setIsApploading(false);
      return window.MessageAlert("Signup failed: " + error.message, "error");
    }

    const user = data.user;

    // Make sure user object exists
    if (user) {
      const userdata = {
        uid: user.id,
        email: user.email,
        firstName,
        role: "client", // Store in custom table as well
      };

      await createUser(userdata);
    } else {
      setIsApploading(false);
      window.MessageAlert("Signup error: User object not found.", "error");
    }
  };

  // Insert into public.users table
  const createUser = async (userdata) => {
    const { data, error } = await supabase.from("users").insert(userdata);

    setIsApploading(false);

    if (error) {
      console.error("Insert error:", error);
      return window.MessageAlert("Failed to create user record", "error");
    }

    window.MessageAlert(
      "Signup successful! Please check your email to verify.",
      "success"
    );
    navigate("/auth/confirmemail");
  };

  return (
    <div className="min-h-screen bg-white my-10">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden md:flex lg:w-1/2 items-center justify-center p-4 lg:p-8">
          <img
            src={signup}
            alt="Sign up illustration"
            className="w-full object-cover rounded-xl lg:!h-[600px] md:h-[300px] md:w-[500px] lg:w-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mb-2">
            Create an account
          </h2>
          <p className="text-black text-sm sm:text-base text-center lg:text-left mb-6 sm:mb-8">
            Enter your details below
          </p>
          <Form>
            <Row className="space-y-4 sm:space-y-5">
              <Col span={20}>
                <Input
                  size="large"
                  placeholder="Name"
                  name="firstName"
                  onChange={handleChange}
                  className="custom-input !placeholder-gray-400"
                />
              </Col>
              <Col span={20}>
                <Input
                  size="large"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="custom-input !my-5 !placeholder-gray-400"
                />
              </Col>
              <Col span={20}>
                <Input
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="custom-input !placeholder-gray-400"
                />
              </Col>
            </Row>
          </Form>

          <div className="mt-6 sm:mt-8 space-y-4">
            <Row>
              <Col span={20}>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleSubmit}
                  loading={isApploading}
                  className="!bg-[#db4444] hover:!bg-[#c73b3b] rounded-full sm:rounded-lg h-12"
                >
                  Create Account
                </Button>
              </Col>
            </Row>
          </div>

          <p className="text-center lg:text-left text-sm sm:text-base mt-6 sm:mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-black font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
