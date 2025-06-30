import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { CartProvider } from "./context/CartContext";

// Lazy load components for better performance
const Gallery = lazy(() => import("./pages/Gallery"));
const Account = lazy(() => import("./pages/Account"));
const Upload = lazy(() => import("./pages/Upload"));
const Checkout = lazy(() => import("./pages/Checkout"));

function App() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/account" element={<Account />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/checkout" element={<Checkout />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </CartProvider>
  );
}

export default App;
