import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Made By */}
        <p className="text-sm text-gray-400 mb-2">
          Made with ❤️ by{" "}
          <span className="text-blue-500 font-semibold">
            Prashrijan Shrestha
          </span>
        </p>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Finance Tracker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
