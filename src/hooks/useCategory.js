import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const BASE_URL=import.meta.env.VITE_BASE_URL;

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}