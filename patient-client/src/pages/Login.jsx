import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const Login = () => {
  const inputFields = [
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
          Login to your account
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login