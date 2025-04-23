import React from "react";
import slide1 from "/assets/images/slide1.jpg";
import slide2 from "/assets/images/slide2.jpg";
import slide3 from "/assets/images/slide3.jpg";
import Carousel from "../../components/Carousel";
import CategoriesCarousel from "../../components/CategoriesCarousel";
import BestSellerProducts from "../../components/BestSellerProducts";
import ServiceFeatures from "../../components/ServiceFeatures";



const carouselImages = [slide1, slide2, slide3];

const HomePage = () => {
  return (
    <div>
      <Carousel images={carouselImages} autoPlayInterval={5000} />
      <ServiceFeatures /> {/* 👈 thêm ở đây */}

      <CategoriesCarousel />
      <BestSellerProducts />
    </div>
  );
};

export default HomePage;
