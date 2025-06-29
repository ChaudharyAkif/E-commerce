import { Input, Button, message as AntdMessage } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import supabase from '../../../config/supabase';

const { TextArea } = Input;

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const messageText = formData.get('message');

    try {
      // 💾 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from('contacts') // ✅ Make sure this table exists
        .insert([{ name, email, phone, message: messageText }]);

      if (supabaseError) throw new Error("Supabase error: " + supabaseError.message);

      // ✉️ 2. Send Email via EmailJS
      await emailjs.send(
        'service_7fiqlf4', // ✅ Your EmailJS service ID
        'template_nwn5fff', // ✅ Your EmailJS template ID
        {
          from_name: name,
          reply_to: email,
          message: messageText,
          phone: phone,
        },
        'oKLuDCIJEUICsh7Y6' // ✅ Replace with your EmailJS Public Key
      );

      // 📬 3. Optional: Submit to Getform
      await fetch('https://getform.io/f/bkknnxvb', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      AntdMessage.success('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Submission error:', error);
      AntdMessage.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-6 bg-white">
      {/* Left Info */}
      <div className="w-full md:w-1/3 bg-white rounded-md shadow p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center bg-red-500 rounded-full p-3">
            <PhoneOutlined className="text-xl !text-white scale-x-[-1]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Call To Us</h3>
            <p className="text-sm text-black">We are available 24/7, 7 days a week.</p>
            <p className="text-sm text-black font-medium">Phone: +8801611112222</p>
          </div>
        </div>

        <hr />

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center bg-red-500 rounded-full p-3">
            <MailOutlined className="text-xl !text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Write To Us</h3>
            <p className="text-sm text-black">We’ll respond within 24 hours.</p>
            <p className="text-sm text-black font-medium">customer@exclusive.com</p>
            <p className="text-sm text-black font-medium">support@exclusive.com</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form className="w-full md:w-2/3 bg-white rounded-md shadow p-6" onSubmit={handleSubmit}>
        <input type="hidden" name="_gotcha" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Your Name *" name="name" required />
          <Input placeholder="Your Email *" type="email" name="email" required />
          <Input placeholder="Your Phone" name="phone" />
        </div>

        <TextArea
          rows={8}
          name="message"
          placeholder="Your Message"
          style={{ resize: 'none' }}
          required
        />

        <div className="text-right mt-4">
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            danger
            className="bg-red-500 hover:bg-red-600 px-8 w-[170px] !h-[45px]"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
