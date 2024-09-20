import femaleDoc from "../../../../images/female-doc.png";


const Hero = () => {
  return (
    <div className="py-28 w-[90%] mx-auto flex flex-col justify-center items-center">
      <div className="grid">
        <h1 className="mx-auto mt-10 text-center text-3xl font-bold text-primary">About Us</h1>
        <div className="flex flex-col lg:flex-row gap-10 mt-8 justify-center items-center">
          <img
            src={femaleDoc}
            alt="Doctor"
            className="max-w-full lg:max-w-[300px] mx-auto"
          />
          <p className="my-auto text-left lg:w-1/2 w-full px-4 leading-7 ">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
