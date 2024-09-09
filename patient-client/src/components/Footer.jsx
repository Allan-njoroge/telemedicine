import { BsFillHospitalFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      title: "LINKS",
      links: [
        { name: "Home", link: "" },
        { name: "Doctors", link: "/doctors" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "contact" },
      ],
    },
    {
      title: "GET IN TOUCH",
      links: [{ name: "+254712345678" }, { name: "health@vitacare.org" }],
    },
  ];

  return (
    <div className="py-10 px-28 grid grid-cols-1 md:grid-cols-2 justify-between">
      <div className="w-1/3">
        <div className="flex items-center gap-2">
          <BsFillHospitalFill className="text-4xl text-primary my-auto" />
          <h1 className="text-3xl font-semibold">
            Vita
            <span className="text-primary">Care</span>
          </h1>
        </div>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          perferendis cumque dolore ratione est asperiores, molestias iusto
          ipsam illum aperiam voluptas
        </p>
      </div>

      {/* Links Section */}
      <div className="flex flex-wrap gap-20">
        {footerLinks.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-2xl">{item.title}</h3>
            <ul>
              {item.links.map((itm, idx) => (
                <li key={idx} className="text-gray-500">
                  <Link to={itm.link} className="hover:text-primary">
                    {itm.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
