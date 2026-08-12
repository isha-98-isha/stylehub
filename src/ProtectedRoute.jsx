import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children }) {
  // Grab state reliably from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login before accessing this page.",
        confirmButtonColor: "#351d1d"
      }).then(() => setRedirect(true));
    }
  }, [currentUser]);

  if (!currentUser) {
    return redirect ? <Navigate to="/login" replace /> : null;
  }

  return children;
}
