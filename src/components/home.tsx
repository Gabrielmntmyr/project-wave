import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import GalleryGrid from "./GalleryGrid";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <GalleryGrid />
    </div>
  );
}

export default Home;
