import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  return (
    <div className="relative">
      <Navbar  />
      <Home className="mt-20" />
    </div>
  )
}

export default App