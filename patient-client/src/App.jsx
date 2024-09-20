import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes */}
        <Route element={<Home className="mt-20" />} path="/" />
        <Route element={<Doctors />} path="/doctors" />
        <Route element={<About />} path="/about"/>
        <Route element={<Contact />} path="/contact" />

        <Route path="*" element={ <div><h1>this page is not found</h1></div>}/>
      </Routes>
    </>
  );
}

export default App;