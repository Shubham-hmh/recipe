import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './singlereciipe.css'
import { Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function SingleRecipe() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch recipe details from Spoonacular API
    const API_KEY =process.env.REACT_APP_API_KEY

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
        <ArrowLeftOutlined />

          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{recipe.title}</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="mb-4">{recipe.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img src={recipe.image} alt={recipe.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>Ingredients</h2>
          <ul className="list-group">
            {recipe.extendedIngredients.map(ingredient => (
              <li key={ingredient.id} className="list-group-item">{ingredient.original}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
    </div>
  );
}

export default SingleRecipe;
