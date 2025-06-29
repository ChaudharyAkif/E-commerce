import { Button, Col, Form, Input, Row } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../../assets/images/signup.jpg";
import googlebtn from "../../../assets/images/google.png";
import { useState } from "react";
import { useAuthcontext } from "../../../context/Auth";
import supabase from "../../../config/supabase";

const initialState = { email: "", password: "" }
export default function SignIn() {
    const { readUser } = useAuthcontext()

    const [state, setState] = useState(initialState)
 const navigate = useNavigate()
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const handleSubmit = async () => {

        let { email, password } = state
        if (!password) { return window.MessageAlert("Please Enter your Password", "error") }
        if (!email) { return window.MessageAlert("Please Enter your email", "error") }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error) {
            readUser(data.user)
            window.MessageAlert("Login Successfully", "success")
            navigate("/")
        } else {
            console.error(error)
            window.MessageAlert("SomTHIING WENT'S WRONG", "error")
        }

    }

    return (
        <div className="min-h-screen bg-white my-10">
            {/* Common Container */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Image Section - Hidden on mobile, visible on tablet and up */}
                <div className="hidden md:flex lg:w-1/2 items-center justify-center p-4 lg:p-8">
                    <img
                        src={signup}
                        alt="Sign up illustration"
                        className="w-full   object-cover rounded-xl lg:!h-[600px] md:h-[300px]  md:w-[500px] lg :w-full"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-12">
                    {/* Mobile-only logo */}
                    <div className="flex md:hidden justify-center mb-6">
                        <img src={signup} alt="Sign up" className="w-20 h-20 object-contain" />
                    </div>

                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl  text-center lg:text-left mb-2">
                        Log in to Exclusive
                    </h2>
                    <p className="text-black text-sm sm:text-base text-center lg:text-left mb-6 sm:mb-8 mt-2">
                        Enter your details below
                    </p>

                    <Form>
                        <div >
                            <Row className="space-y-4 sm:space-y-5">

                                <Col span={20}>
                                    <Input
                                        size="large"
                                        placeholder="Email or Phone Number"
                                        className="custom-input !my-5 !placeholder-gray-400"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col span={20}>
                                    <Input
                                        size="large"
                                        placeholder="Password"
                                        className="custom-input !placeholder-gray-400 "
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Form>

                    <div className="mt-6 sm:mt-8 space-y-4">
                        <Row >
                            <Col span={12}>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!bg-red-500 hover:bg-red-600 rounded-full sm:rounded-lg h-12"
                                    onClick={handleSubmit}
                                >
                                    Login in
                                </Button>
                            </Col>
                            <Col span={12} className="mt-.4">
                                <Link to={"/auth/forgetpassword"}>
                                    <Button type="link" className="!text-lg !text-[#db4444]">
                                        Forget Password?
                                    </Button></Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}