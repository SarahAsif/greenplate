"use client";
import React, { useContext, useState, useEffect } from "react";
import Book from "../../components/Book";
import { AppContext } from "../../context/AppContext";
import ShimmerCard from "../../components/ShimmerCard";
import Slider from "../../components/Slider";

const categories = [
  "Italian",
  "Mexican",
  "Salads",
  "Vegetarian",
  "Comfort Food",
  "Desserts",
];

const Home = () => {
  const { filteredData, isLoading } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollToSection = (category) => {
    const section = document.getElementById(category);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredDishes = (category) => {
    if (category === "All") return filteredData;
    return filteredData.filter((dish) => dish.category === category);
  };

  useEffect(() => {
    console.log("Filtered Data:", filteredData);
  }, [filteredData]);

  return (
    <>
      <Slider />

      <header className="text-center p-8 pt-10 pb-10 bg-green-900 text-white mt-3">
        <h1 className="text-5xl font-bold">
          Explore our selection of delicious dishes!
        </h1>
      </header>

      <div className="flex flex-wrap justify-center gap-4 bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              filterByCategory(category);
              scrollToSection(category);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-base sm:text-lg"
          >
            {category}
          </button>
        ))}
      </div>

      {categories.map((category) => (
        <div
          key={category}
          id={category}
          className="py-8 bg-gray-50"
          style={{
            display:
              selectedCategory === category || selectedCategory === "All"
                ? "block"
                : "none",
          }}
        >
          <h2 className="text-center text-3xl font-bold mb-6">
            {category} Dishes
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-center">
            {isLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <ShimmerCard key={idx} />
                ))
              : getFilteredDishes(category).map((d) => (
                  <Book data={d} key={d.name} />
                ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
