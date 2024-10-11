import { useState } from "react";
import { BsFillHospitalFill } from "react-icons/bs";
import { MdMenu, MdClose, MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const navLinks = [
    { name: "Dashboard", link: "/dashboard", icon: <LuLayoutDashboard /> },
    { name: "Profile", link: "/profile", icon: <CgProfile /> },
    { name: "History", link: "/history", icon: <FaHistory /> },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Menu SideBar */}
      <div
        className={`fixed ml-4  bg-white border-2 border-primary/50 h-[95vh] top-[2.5vh] p-5 rounded-md transition-all ease-in-out duration-300  ${
          menuOpen ? "md:w-1/5" : "w-[5%]"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <div
            className={`flex items-center gap-2 ${menuOpen ? "" : "hidden"}`}
          >
            {/* Icon and title */}
            <BsFillHospitalFill className="text-4xl text-primary my-auto" />
            <h1 className="text-3xl font-semibold">
              Vita
              <span className="text-primary">Care</span>
            </h1>
          </div>

          {/* Menu Close Button */}
          <div className={`flex items-center ${menuOpen ? "" : "mx-auto"}`}>
            {menuOpen ? (
              <MdClose
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <MdMenu
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="mt-10">
          <ul className="grid gap-2">
            {navLinks.map((item, index) => (
              <Link to={item.link} key={index}>
                <li
                  className={`flex items-center gap-2 text-xl hover:bg-primary/20 p-2 rounded-md pl-3 ${
                    menuOpen ? "" : "mx-auto"
                  } `}
                >
                  <span>{item.icon}</span>
                  <p className={`${menuOpen ? "" : "hidden"}`}>{item.name}</p>
                </li>
              </Link>
            ))}
            <br />
            <br />
            <li
              className={`flex items-center gap-2 text-xl hover:bg-primary/20 p-2 rounded-md md:pl-3 ${
                menuOpen ? "" : "mx-auto"
              } `}
            >
              <MdOutlineLogout />
              <p className={`${menuOpen ? "" : "hidden"}`}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
