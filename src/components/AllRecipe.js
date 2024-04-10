
import './allrecipe.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    // Fetch recipes from Spoonacular API based on search query and category
    const fetchRecipes = async () => {
     const API_KEY =process.env.REACT_APP_API_KEY

      let url = `https://api.spoonacular.com/recipes/random?number=4&apiKey=${API_KEY}`

      if (searchQuery) {
        url += `&query=${searchQuery}`;
      }

      if (selectedCategory) {
        url += `&tags=${selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Clear the previous timeout
    clearTimeout(typingTimeout);

    setTypingTimeout(setTimeout(() => {
      setSearchQuery(value);
    }, 500));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4">Recipes</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or ingredients"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control mb-2"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-control"
          >
            <option value="">All Categories</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
          </select>
        </div>
        <ul className="list-group">
          {recipes?.map(recipe => (
            <li key={recipe.id} className="list-group-item">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="row align-items-center">
                  <div className="col-3">
                    <img src={recipe.image} alt={recipe.title} className="img-fluid rounded" />
                  </div>
                  <div className="col-9">
                    <h5 className="mb-1">{recipe.title}</h5>
                    <p className="mb-1">{recipe.summary.substring(0, 100)}...</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;


