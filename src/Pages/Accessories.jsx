import { products } from "../data";
import ProductList from "../components/ProductList";

export default function Accessories() {
  const accessioriesProducts = products.filter(p => p.category === "accessiories");

  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/clothing-accessories-men-women-ready-travel-life-style_11304-1345.jpg')" }}>
        <h2>Accessories</h2>
        <p>Discover the latest trends in accessories for every occasion.</p>
        <button onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>
          Shop Now
        </button>
      </section>
      <div className="container products-container">
      <ProductList products={accessioriesProducts} />
    </div>
    
    </>
  );
}
