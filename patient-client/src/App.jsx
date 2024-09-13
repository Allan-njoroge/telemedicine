import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes */}
        <Route element={<Home className="mt-20" />} path="/" />
        <Route element={<Doctors />} path="/doctors"/>
      </Routes>
    </>
  );
}

export default App;
