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
      // Back/forward → instantly jump to saved scroll position
      window.scrollTo({ top: scrollPositions[pathname] ?? 0, behavior: "instant" });
    } else if (isProductDetail) {
      // Entering product detail → don’t change scroll position
      return;
    } else {
      if (lastPathname === pathname) {
        // Re‑clicking same navbar link → instantly jump to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Switching to another page → instantly jump to previous scroll position
        window.scrollTo({ top: scrollPositions[pathname] ?? 0, behavior: "smooth" });
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
