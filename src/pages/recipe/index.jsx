import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Recipe = () => {
  const { name } = useParams();
  const { dishes } = useContext(AppContext);
  const recipe = dishes.find((item) => item.name === decodeURIComponent(name));

  if (!recipe) {
    return <p className="text-center text-red-500">Recipe not found</p>;
  }
  console.log(name);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-4 bg-green-600 text-white">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
      </header>
      <main className="mt-6">
        <div className="flex flex-col items-center">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-64 h-64 object-cover rounded-md shadow-lg mb-4"
          />
          <p className="text-lg mb-4">{recipe.description}</p>
          <div className="text-md font-semibold">Recipe:</div>
          <pre className="whitespace-pre-line mt-2">{recipe.recipe}</pre>
        </div>
      </main>
    </div>
  );
};

export default Recipe;
