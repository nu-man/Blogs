import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllBlogs/>}/>
        <Route path="/blog" element={<SingleBlog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
