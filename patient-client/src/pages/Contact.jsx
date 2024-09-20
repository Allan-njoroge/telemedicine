import Footer from "@/components/Footer";
import femaleDoc from "../../../images/female-doc.png"

const Contact = () => {
  return (
    <>
      <div className="py-28 w-[90%] mx-auto flex flex-col justify-center items-center">
        <div className="grid">
          <h1 className="mx-auto mt-10 text-center text-3xl font-bold text-primary">
           Contact Us
          </h1>
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-8 justify-center items-center">
            <img
              src={femaleDoc}
              alt="Doctor"
              className="max-w-full lg:max-w-[300px] mx-auto"
            />
            <div className="my-auto text-center md:text-left lg:w-1/2 w-full px-4 leading-7 ">
              <h2>OUR OFFICE</h2>
              <br />
              <p>Nairobi, Nairobi</p>
              <p>Nairobi, Nairobi</p>
              <br />
              <p>Tel: (000) 000-0000</p>
              <p>Email: allan@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
