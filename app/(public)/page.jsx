import { HeroSection }         from "@/components/home/HeroSection";
import { CategoriesSection }   from "@/components/home/CategoriesSection";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { TrendingFoods }       from "@/components/home/TrendingFoods";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AppDownloadSection }  from "@/components/home/AppDownloadSection";

export const metadata = {
  title: "Order Food Online | Smart Food Delivery",
  description: "Order from 500+ restaurants and get hot food delivered to your door in 30 minutes.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedRestaurants />
      <TrendingFoods />
      <TestimonialsSection />
      <AppDownloadSection />
    </>
  );
}
