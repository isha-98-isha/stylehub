import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import Swal from "sweetalert2";
import { products } from "../data";

export default function ProductDetail() { // Prop removed
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = location.state?.product || products.find(p => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  const handleAdd = () => {
    dispatch(addItem(product));
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <main className="product-detail">
      <img src={product.img} alt={product.name} className="detail-img" />
      <h2>{product.name}</h2>
      <p className="price">₹{product.price}</p>
      <p>{product.description}</p>
      {product.material && <p>Material: {product.material}</p>}
      {product.delivery && <p>Delivery: {product.delivery}</p>}
      {product.returnPolicy && <p>Return Policy: {product.returnPolicy}</p>}
      <button onClick={handleAdd}>Add to Cart</button>
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    </main>
  );
}
