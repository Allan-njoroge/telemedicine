import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFOund";
import Dashboard from "./pages/Dashboard";

function App() {
  
  const location = useLocation()


  return (
    <>
      {/* <Navbar className={`${location.pathname === '/login' || location.pathname === '/signup' ? "none" : ""}`} /> */}
      {/* <Navbar /> */}
      <Routes>
        {/* Routes */}
        <Route element={<Home className="mt-20" />} path="/" />
        <Route element={<Doctors />} path="/doctors" />
        <Route element={<About />} path="/about"/>
        <Route element={<Contact />} path="/contact" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login/>} path="/login" />
        <Route element={<Dashboard/>} path="/dashboard" />

        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;