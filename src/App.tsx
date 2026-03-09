import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage"
import { PostsPage } from "./pages/home/posts/PostsPage";
import { UserPostPage } from "./pages/home/user/UserPostPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts/:id" element={<PostsPage/>} />
        <Route path="/user/:id" element={<UserPostPage/>} />
        </Routes>
    </BrowserRouter>
  )
};

export default App