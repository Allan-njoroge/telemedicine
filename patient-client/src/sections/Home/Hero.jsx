import { Button } from "@/components/ui/button";
import { HiArrowLongRight } from "react-icons/hi2";
import femaleDoc from "../../../public/female-doc.png";

const Hero = () => {
  return (
    <div className="w-[90%] mx-auto min-h-[100vh] flex justify-center items-center">
      <div className=" bg-primary/50 min-h-[70vh] w-full rounded-md flex px-10 pt-20 justify-evenly flex-col md:flex-row relative">
        {/* Text Section */}
        <div className="my-auto text-center md:w-1/2 z-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-white">
            Book Counsultations With Our Trusted Doctors
          </h1>
          <p className="my-3 text-white/90">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
          <Button variant="secondary" className="hover:scale-105 hover">
            Book Consultation
            <HiArrowLongRight className="text-2xl ml-2" />
          </Button>
        </div>

        {/* image */}
        <div className="mx-auto mt-10 md:mt-0 md:absolute bottom-0 right-5">
          <img src={femaleDoc} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
