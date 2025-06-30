import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1513569143478-b38b2c0ef97f?w=1200&q=80"
        alt="Featured surf photo"
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Stunning Surf Photography
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-center">
          Discover and purchase beautiful ocean and surfing images from talented
          photographers
        </p>
        <Button asChild size="lg">
          <Link to="/gallery">Browse Gallery</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
