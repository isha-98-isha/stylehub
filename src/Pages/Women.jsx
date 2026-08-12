import { products } from "../data";
import ProductList from "../components/ProductList";

export default function Women() {
  const womenProducts = products.filter(p => p.category === "women");

  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('https://ericaobrien.com/wp-content/uploads/2023/06/Popular-Minimalist-Jewelry-Brands-1920x1080.jpg')" }}>
        <h2>Women's Collection</h2>
        <p>Discover dresses, footwear, and accessories curated for you.</p>
        <button onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>
          Shop Now
        </button>
      </section>

      <div className="container products-container">
      <ProductList products={womenProducts} />
    </div>
    </>
  );
}
