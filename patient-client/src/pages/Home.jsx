import Footer from "@/components/Footer";
import Doctors from "@/sections/Home/Doctors";
import Hero from "@/sections/Home/Hero";
import Why from "@/sections/Home/Why";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Why />
      <Doctors />
      <Footer />
    </div>
  );
};

export default Home;
