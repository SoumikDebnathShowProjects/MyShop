import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-4">
      <form 
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow px-4 py-2 focus:outline-none"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button 
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;