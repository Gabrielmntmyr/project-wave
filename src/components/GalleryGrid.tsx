import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoModal from "./PhotoModal";

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

const photos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    alt: "Surfer riding a wave",
    category: "surfers",
    title: "Morning Surf",
    description: "Surfer catching the perfect wave at sunrise",
    price: 25,
    photographer: "Wave Chaser",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80",
    alt: "Ocean wave",
    category: "waves",
    title: "Perfect Barrel",
    description: "Beautiful barrel wave forming at sunset",
    price: 30,
    photographer: "Ocean View",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Beach view",
    category: "beach",
    title: "Tranquil Shore",
    description: "Peaceful beach scene with gentle waves",
    price: 20,
    photographer: "Sandy Toes",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1495819427834-1954f20ebb97?w=800&q=80",
    alt: "Sunset surf",
    category: "surfers",
    title: "Golden Hour Session",
    description: "Surfer silhouette against a golden sunset",
    price: 35,
    photographer: "Sunset Shooter",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1515541324332-7dd0c37426e0?w=800&q=80",
    alt: "Breaking wave",
    category: "waves",
    title: "Power Surge",
    description: "Powerful wave breaking near the shore",
    price: 28,
    photographer: "Wave Watcher",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80",
    alt: "Beach aerial",
    category: "beach",
    title: "Coastal Patterns",
    description: "Aerial view of beautiful coastline patterns",
    price: 40,
    photographer: "Sky View",
  },
];

const categories = ["all", "surfers", "waves", "beach"];

const GalleryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhoto.id,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex =
        currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center mb-8 space-x-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-md cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end justify-between p-4">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-medium">{photo.title}</h3>
                <p className="text-sm">{photo.photographer}</p>
              </div>
              <div className="bg-white text-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                ${photo.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          isOpen={!!selectedPhoto}
          onClose={handleCloseModal}
          currentPhoto={selectedPhoto}
          photos={filteredPhotos}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default GalleryGrid;
