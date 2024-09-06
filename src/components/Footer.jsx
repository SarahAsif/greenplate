import React from "react";
import { Link } from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Green Plate</h2>
          <p className="text-gray-400">
            Serving delicious food with the freshest ingredients since 2024.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-300 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-300 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-300 transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-300 transition duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Green Plate. All rights reserved. | Designed with ❤ by Green
          Plate Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
