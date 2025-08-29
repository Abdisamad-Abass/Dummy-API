import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (page - 1) * limit;
        const res = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        setProducts(res.data.products);
        setTotalProducts(res.data.total); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
            <p className="font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
