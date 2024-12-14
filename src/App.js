import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs"; // Import the AllBlogs component
import SingleBlog from "./pages/SingleBlog";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllBlogs />} /> {/* Route to AllBlogs */}
        <Route path="/blog/:id" element={<SingleBlog />} /> {/* Route to individual blog */}
      </Routes>
    </Router>
  );
};

export default App;
