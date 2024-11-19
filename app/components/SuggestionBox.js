"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { FaAngleDown, FaAngleUp, FaBars, FaTimes } from "react-icons/fa";

const SuggestionBox = ({ inputValue, setInputValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);
  const [isMobileVisible, setIsMobileVisible] = useState(false); // For mobile responsiveness

  // Load suggestions from the CSV file
  useEffect(() => {
    Papa.parse("/data/Extended_FAQ.csv", {
      download: true,
      header: true,
      complete: ({ data }) => {
        const validSuggestions = data
          .filter((row) => row.prompt && row.response)
          .map((row) => ({ prompt: row.prompt, response: row.response }));
        setSuggestions(validSuggestions);
      },
      error: (err) => console.error("CSV load error:", err),
    });
  }, []);

  // Filter suggestions based on the input
  useEffect(() => {
    setFilteredSuggestions(
      inputValue.trim()
        ? suggestions.filter((s) =>
            s.prompt.toLowerCase().includes(inputValue.toLowerCase())
          )
        : suggestions
    );
  }, [inputValue, suggestions]);

  const toggleResponse = (index, e) => {
    e.stopPropagation();
    setExpandedSuggestion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="h-full">
      {/* Toggle for Mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-white">Suggestions</h3>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setIsMobileVisible(!isMobileVisible)}
        >
          {isMobileVisible ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Suggestion List */}
      <div
        className={`${
          isMobileVisible || window.innerWidth >= 768 ? "block" : "hidden"
        } md:block bg-gray-800 rounded-md p-2 transition-all`}
      >
        <ul className="overflow-y-auto max-h-[60vh] md:max-h-[800px] custom-scrollbar">
          {filteredSuggestions.length ? (
            filteredSuggestions.map((s, i) => (
              <li key={i} className="mb-4">
                <div
                  className="flex items-center cursor-pointer px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
                  onClick={() => setInputValue(s.prompt)}
                >
                  <span className="flex-grow text-white">{s.prompt}</span>
                  <button
                    className="ml-2 text-gray-400 hover:text-white"
                    onClick={(e) => toggleResponse(i, e)}
                  >
                    {expandedSuggestion === i ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                </div>
                {expandedSuggestion === i && (
                  <div className="mt-2 pl-6 text-gray-300 text-sm">
                    {s.response}
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No suggestions found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SuggestionBox;
