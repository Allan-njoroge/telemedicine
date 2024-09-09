import { Link } from "react-router-dom";
import maleDoc from "../../../public/male-doc.png";
import { Button } from "@/components/ui/button";

const Doctors = () => {
  const doctorsInfo = [
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
    { name: "Allan Njoroge", speciality: "Pediatrician" },
  ];
  return (
    <div className="w-[90%] mx-auto py-20">
      <h1 className="text-center text-3xl font-semibold text-primary">
        Our Doctors
      </h1>

      {/* doctors information */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 md:w-[80%] mx-auto">
        {doctorsInfo.map((item, index) => (
          <Link>
            <div
              key={index}
              className="border border-black/20 rounded-md hover:-translate-y-2 hover:border-primary transition-all ease-in-out duration-500"
            >
              <div className="bg-primary/20 pt-5">
                <img src={maleDoc} alt="" className="w-1/2 mx-auto" />
              </div>
              {/* doctors text */}
              <div className="p-5 grid gap-2">
                <h4 className="font-semibold text-xl">{item.name}</h4>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/*  */}
      <Link to={'/doctors'}>
        <Button className="flex justify-center mx-auto mt-20 text-xl font-light">
          More Doctors
        </Button>
      </Link>

      <div className="h-[30vh] bg-primary/50 mt-20 rounded-xl flex flex-col justify-center items-center gap-5 px-10 text-center">
        <h1 className="font-semibold text-4xl text-white">Book Consultations With Our Trusted Doctors</h1>
        <Button variant="secondary">Get Started</Button>
      </div>
    </div>
  );
};

export default Doctors;
