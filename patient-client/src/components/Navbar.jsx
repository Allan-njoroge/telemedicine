import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { BsFillHospitalFill } from "react-icons/bs";

import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", link: "/" },
    { name: "DOCTORS", link: "/doctors" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];

  let location = useLocation()

  return (
    <div className="fixed left-[5%] w-[90%] bg-white flex items-center justify-between mx-auto my-5 border border-black/20 rounded-md px-5 py-3 z-50">
      {/* Logo and Name */}
      <div className="flex items-center gap-2">
        <BsFillHospitalFill className="text-4xl text-primary my-auto" />
        <h1 className="text-3xl font-semibold">
          Vita
          <span className="text-primary">Care</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col md:flex-row gap-3 absolute md:static top-20 md:top-0 left-[5%] border bg-white border-black/20 md:border-none w-[90%] md:w-auto p-5 md:p-0 rounded-md transition-all ease-in-out duration-500 ${
          menuOpen ? "" : "top-[-600px]"
        } `}
      >
        {navLinks.map((item, index) => (
          <Link key={index} to={item.link} onClick={() => setMenuOpen(false)}>
            <li className={`px-3 py-1 border-b-4 border-white hover:border-primary hover:text-primary font-semibold ${ location.pathname === item.link ? "border-b-primary text-primary" : "" }`}>
              {item.name}
            </li>
          </Link>
        ))}
        <Button className="md:hidden">Sign In</Button>
      </ul>

      {/* Sign in button and profile option */}
      <div>
        <Button className="hidden md:flex">Sign In</Button>
        {/* Menu navigation icons */}
        <div className="flex md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <MdClose className="text-3xl" />
          ) : (
            <MdMenu className="text-3xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
