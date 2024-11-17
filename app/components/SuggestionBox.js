"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; // Better icons

const SuggestionBox = ({ inputValue, setInputValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [expandedSuggestion, setExpandedSuggestion] = useState(null); // Track expanded suggestion
  const [searchQuery, setSearchQuery] = useState(inputValue); // Debounced search input

  // Load suggestions and responses from the CSV file
  useEffect(() => {
    Papa.parse("/data/Extended_FAQ.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        const suggestionsWithResponses = data.map((row) => ({
          prompt: row["prompt"],
          response: row["response"],
        }));
        setSuggestions(suggestionsWithResponses.filter(Boolean)); // Remove empty rows
      },
      error: (err) => console.error("Error loading CSV:", err),
    });
  }, []);

  // Debounced input for filtering suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // Delay to reduce unnecessary calls while typing

    return () => clearTimeout(timeoutId); // Cleanup timeout on input change
  }, [inputValue]);

  // Filter suggestions based on the search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions); // Show all suggestions if no input
    }
  }, [searchQuery, suggestions]);

  // Handle suggestion click to update input value
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.prompt); // Set suggestion in the input field
  };

  // Toggle response visibility
  const handleToggleResponse = (index, e) => {
    e.stopPropagation(); // Prevent triggering the click event for updating input
    if (expandedSuggestion === index) {
      setExpandedSuggestion(null); // Close if clicked again
    } else {
      setExpandedSuggestion(index); // Expand the selected suggestion
    }
  };

  return (
    <div className="h-full">
      <h3 className="font-semibold mb-4 text-lg text-white">Suggestions</h3>
      <ul className="overflow-y-auto max-h-[800px] bg-gray-800 rounded-md p-2 custom-scrollbar">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion, index) => (
            <li key={index} className="mb-4">
              {/* Suggestion Item with Toggle Arrow */}
              <div
                className="flex items-center cursor-pointer px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)} // Set suggestion in input when clicked (not on the arrow)
              >
                <span className="flex-grow text-white">
                  {suggestion.prompt}
                </span>
                <button
                  className="ml-2 text-gray-400 hover:text-white transition-all"
                  onClick={(e) => handleToggleResponse(index, e)} // Handle the arrow click separately
                >
                  {expandedSuggestion === index ? (
                    <FaAngleUp className="text-gray-400" />
                  ) : (
                    <FaAngleDown className="text-gray-400" />
                  )}
                </button>
              </div>
              {/* Display response if expanded */}
              {expandedSuggestion === index && (
                <div className="mt-2 pl-6 text-gray-300 text-sm transition-all">
                  {suggestion.response}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-400">No suggestions found</li>
        )}
      </ul>
    </div>
  );
};

export default SuggestionBox;
