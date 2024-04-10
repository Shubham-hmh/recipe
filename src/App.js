
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
