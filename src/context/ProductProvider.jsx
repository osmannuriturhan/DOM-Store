import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); //veri gelene kadar kullanıcıya boş sayfa göstermek yerine loading göstermek için
  const [search, setSearch] = useState(""); //*input için burada oluşturduk ki products sayfası render olduğunda userın yazdığı değer kaybolmasın.
  console.log(search);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios(
        `https://dummyjson.com/products/search?q=${search}`
      );
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <ProductContext.Provider value={{ products, loading, search, setSearch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProducts = () => {
  return useContext(ProductContext);
};
