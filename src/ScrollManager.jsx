import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = {};
let lastPathname = null;

export default function ScrollManager() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const isProductDetail = pathname.startsWith("/product/");

    if (navigationType === "POP") {
      // Back/forward → restore saved scroll
      window.scrollTo(0, scrollPositions[pathname] ?? 0);
    } else if (isProductDetail) {
      // Entering product detail → don’t change scroll
      return;
    } else {
      if (lastPathname === pathname) {
        // Re‑clicking same navbar link → scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Switching to another page → restore previous scroll
        window.scrollTo(0, scrollPositions[pathname] ?? 0);
      }
    }

    lastPathname = pathname;
  }, [pathname, navigationType]);

  useEffect(() => {
    const savePosition = () => {
      const isProductDetail = pathname.startsWith("/product/");
      if (!isProductDetail) {
        // Only save scroll for non‑product pages
        scrollPositions[pathname] = window.scrollY;
      }
    };
    window.addEventListener("scroll", savePosition, { passive: true });
    return () => window.removeEventListener("scroll", savePosition);
  }, [pathname]);

  return null;
}
