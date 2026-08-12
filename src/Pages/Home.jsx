import { products } from "../data";
import ProductList from "../components/ProductList";

function Home() {
  const homeProducts = products.filter((p) => p.category === "Home");

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        <h2>Discover Your Style</h2>
        <p>Trendy clothes. Premium quality. Delivered fast.</p>
        <button onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>
          Shop Now
        </button>
      </section>

      <div className="container products-container">
        <ProductList products={homeProducts} />
      </div>
    </>
  );
}

export default Home;
