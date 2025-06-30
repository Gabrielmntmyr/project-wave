import React from "react";
import Navigation from "../components/Navigation";
import GalleryGrid from "../components/GalleryGrid";

const Gallery = () => {
  return (
    <div className="w-screen min-h-screen bg-white">
      <Navigation />
      <div className="py-8 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Photo Gallery</h1>
        <GalleryGrid />
      </div>
    </div>
  );
};

export default Gallery;
