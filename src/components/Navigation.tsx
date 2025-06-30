import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const { cartItems } = useCart();

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-primary">
        SurfShots
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/gallery"
          className="text-sm text-gray-600 hover:text-primary"
        >
          Gallery
        </Link>
        <Link
          to="/account"
          className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
        >
          <User className="h-4 w-4" />
          Account
        </Link>
        <Link
          to="/checkout"
          className="text-sm text-gray-600 hover:text-primary flex items-center gap-1 relative"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {cartItems.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartItems.length}
            </Badge>
          )}
        </Link>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Link to="/upload">
            <Upload className="h-4 w-4" />
            Upload
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
