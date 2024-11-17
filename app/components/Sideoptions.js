// components/Sidebar.js
"use client";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-2xl bg-transparent border-0 text-white"
      >
        ×
      </button>
      <h2 className="text-xl mb-4">Sidebar Title</h2>
      <ul>
        <li>
          <a href="#" className="block py-2 hover:text-green-400">
            Link 1
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 hover:text-green-400">
            Link 2
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 hover:text-green-400">
            Link 3
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 hover:text-green-400">
            Link 4
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
