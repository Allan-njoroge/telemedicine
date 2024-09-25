import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const Signup = () => {
  const inputFields = [
    { name: "First Name", id: "#firstName", type: "text", placeholder: "John" },
    { name: "Last Name", id: "#lastName", type: "text", placeholder: "Doe" },
    {
      name: "Email Address",
      id: "#emailAddress",
      type: "email",
      placeholder: "johndoe@gmail.com",
    },
    {
      name: "Password",
      id: "#password",
      type: "password",
      placeholder: "password",
    },
  ];

  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <form className=" md:w-[50%] mx-auto flex flex-col gap-4 md:p-10 rounded-md">
        <h1 className="text-center text-3xl font-semibold text-primary">
          Create Account
        </h1>
        {inputFields.map((item, index) => (
          <div key={index}>
            <Label className="ml-2">{item.name}</Label>
            <input
              type={item.type}
              id={item.id}
              required
              placeholder={item.placeholder}
              className="p-2 border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-primary transition-all ease-in-out duration-500"
            />
          </div>
        ))}
        <Button>Create account</Button>
        <br />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
