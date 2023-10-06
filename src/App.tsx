import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productDetail, setProductDetail] = useState(null);

  const onChangeSearchText = async (e) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${e.target.value}`
    );
    const body = await response.json();
    setProducts(body.products);
  };

  const onClickCategory = async (category: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const body = await response.json();
    setProducts(body.products);
  };

  const onClickProduct = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const body = await response.json();
    setProductDetail(body);
    setPage(2);
  };

  const initialFetch = async () => {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    const body = await response.json();
    setCategories(body);
  };

  useEffect(() => {
    initialFetch();
  }, []);
  if (page === 1)
    return (
      <>
        <input onChange={onChangeSearchText} />
        {categories && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {categories.map((c) => (
              <div onClick={() => onClickCategory(c)}>{c}</div>
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {products.map((p) => (
            <div>
              <img
                onClick={() => onClickProduct(p.id)}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
                src={p.thumbnail}
              />
              <p>{p.title}</p>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </>
    );
  if (page === 2 && productDetail)
    return (
      <div>
        <img src={productDetail.thumbnail} />
        <div>
          {productDetail.images.map((i) => (
            <img src={i} />
          ))}
        </div>
        <p>{productDetail.price}</p>
        <p>{productDetail.title}</p>
        <p>{productDetail.description}</p>
      </div>
    );
}

export default App;
