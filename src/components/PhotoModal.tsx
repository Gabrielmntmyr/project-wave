import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ShoppingCart } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  price: number;
  photographer: string;
}

interface PhotoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentPhoto?: Photo;
  photos?: Photo[];
  onNavigate?: (direction: "prev" | "next") => void;
}

const PhotoModal = ({
  isOpen = true,
  onClose = () => {},
  currentPhoto = {
    id: "1",
    src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80",
    alt: "Surfer riding a wave",
    category: "surfers",
    title: "Morning Surf",
    description: "Surfer catching the perfect wave at sunrise",
    price: 25,
    photographer: "Wave Chaser",
  },
  photos = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80",
      alt: "Surfer riding a wave",
      category: "surfers",
      title: "Morning Surf",
      description: "Surfer catching the perfect wave at sunrise",
      price: 25,
      photographer: "Wave Chaser",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=1200&q=80",
      alt: "Ocean wave",
      category: "waves",
      title: "Perfect Barrel",
      description: "Beautiful barrel wave forming at sunset",
      price: 30,
      photographer: "Ocean View",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      alt: "Beach view",
      category: "beach",
      title: "Tranquil Shore",
      description: "Peaceful beach scene with gentle waves",
      price: 20,
      photographer: "Sandy Toes",
    },
  ],
  onNavigate = () => {},
}: PhotoModalProps) => {
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setLoading(true);
    setPurchased(false);
    onNavigate(direction);
  };

  const handlePurchase = () => {
    // Add to cart and show feedback
    setTimeout(() => {
      setPurchasing(false);
      setPurchased(true);
      setTimeout(() => setPurchased(false), 2000);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[90vw] max-h-[90vh] p-0 bg-white overflow-hidden">
        <div className="relative flex flex-col h-full bg-black/95">
          {/* Close button */}
          <DialogClose className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>

          {/* Main image container */}
          <div className="flex-1 flex items-center justify-center p-4 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="max-h-full max-w-full object-contain"
              onLoad={handleImageLoad}
            />
          </div>

          {/* Navigation and info footer */}
          <div className="p-4 bg-white text-black">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{currentPhoto.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {currentPhoto.description}
                </p>
                <p className="text-xs text-gray-500">
                  By {currentPhoto.photographer}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleNavigation("prev")}
                    disabled={photos.indexOf(currentPhoto) === 0}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleNavigation("next")}
                    disabled={
                      photos.indexOf(currentPhoto) === photos.length - 1
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {photos.indexOf(currentPhoto) + 1} of {photos.length}
                </div>
              </div>
            </div>

            {/* Purchase section */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <div className="text-2xl font-bold">${currentPhoto.price}</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setPurchasing(true);
                    // Use the already imported useCart hook
                    handlePurchase();
                  }}
                  disabled={purchasing || purchased}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  {purchasing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-primary rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : purchased ? (
                    "Added!"
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => (window.location.href = `/checkout`)}
                  className="flex items-center gap-2"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
