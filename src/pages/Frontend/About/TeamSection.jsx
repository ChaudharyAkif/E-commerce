// src/components/TeamSection.jsx
import React from 'react';
import { InstagramOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

// import your images
import akifImg from '../../../assets/images/Akif.jpeg';
import tayyab from '../../../assets/images/tayyab.jpeg';
import hammad from '../../../assets/images/hammad.jpeg';

const teamMembers = [
  {
    name: 'Muhammad Akif Hussain',
    title: 'Founder & Chairman',
    img: akifImg,
    socials: {
      twitter: 'https://twitter.com/akifhussain',
      instagram: 'https://instagram.com/akifhussain',
      linkedin: 'https://linkedin.com/in/akifhussain',
    },
  },
  {
    name: 'Muhammad Tayyab',
    title: 'Managing Director',
    img: tayyab,
    socials: {
      twitter: 'https://twitter.com/tayyab',
      instagram: 'https://instagram.com/tayyab',
      linkedin: 'https://linkedin.com/in/tayyab',
    },
  },
  {
    name: 'Muhammad Hammad',
    title: 'Product Designer',
    img: hammad,
    socials: {
      twitter: 'https://twitter.com/hammad',
      instagram: 'https://instagram.com/hammad',
      linkedin: 'https://linkedin.com/in/hammad',
    },
  },
];

export default function TeamSection() {
  return (
    <div className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-lg p-6">
            <img
              src={member.img}
              alt={member.name}
              className="w-[350px] h-[400px] object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.title}</p>
            <div className="flex justify-center gap-4 mt-4 text-xl text-gray-600">
              <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterOutlined className="hover:text-blue-500 cursor-pointer" />
              </a>
              <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="hover:text-pink-500 cursor-pointer" />
              </a>
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined className="hover:text-blue-700 cursor-pointer" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
