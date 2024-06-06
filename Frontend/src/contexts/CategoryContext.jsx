/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7249/api/Category');
        if (response.status === 200) {
          setCategories(response.data.data);
        } else {
          console.error('Failed to fetch categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  // Menambahkan kemampuan untuk melakukan filter produk berdasarkan kategori
  const filterProductsByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(`https://localhost:7249/api/Product?PageNumber=1&PageSize=6&CategoryId=${categoryId}`);
      if (response.status === 200) {
        return response.data.data.items;
      } else {
        console.error('Failed to fetch products by category ID:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching products by category ID:', error.message);
      return [];
    }
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const getCategoryIdByName = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.id : '';
  };

  return (
    <CategoryContext.Provider value={{ categories, filterProductsByCategoryId, getCategoryNameById, getCategoryIdByName }}>
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => useContext(CategoryContext);
