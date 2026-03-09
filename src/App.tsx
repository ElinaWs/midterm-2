import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage"
import { PostsPage } from "./pages/home/posts/PostsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts/:id" element={<PostsPage/>} />
        </Routes>
    </BrowserRouter>
  )
};

export default App