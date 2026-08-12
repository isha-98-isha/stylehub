import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let items = products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearch)
    );

    if (sortOption === "price-asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      items = [...items].sort((a, b) => b.name.localeCompare(a.name));
    }

    return items;
  }, [products, search, sortOption]);

  return (
    <>
      <div className="product-controls">
        <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center">
          <input
            type="search"
            className="form-control product-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select product-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort products</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name-asc">Name: A - Z</option>
            <option value="name-desc">Name: Z - A</option>
          </select>
        </div>
      </div>

      <div className="row gx-4 gy-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-3">
            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              className="product-card"
            >
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;