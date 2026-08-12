import { products } from "../data";
import ProductList from "../components/ProductList";

export default function Men() {
  const menProducts = products.filter(p => p.category === "men");

  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')" }}>
        <h2>Men's Collection</h2>
        <p>Explore the latest styles for men — clothing, footwear, and accessories.</p>
        <button onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>
          Shop Now
        </button>
      </section>
      <div className="container products-container">
        <ProductList products={menProducts} />
      </div>
    </>
  );
}
