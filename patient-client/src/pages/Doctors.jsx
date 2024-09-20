import { Button } from "@/components/ui/button";
import { IoMdFunnel } from "react-icons/io";

import DoctorsInfo from "@/sections/Home/Doctors"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Doctors = () => {
  const doctorFields = [
    { field: "Pediatrician" },
    { field: "Surgeon" },
    { field: "Primary Care" },
    { field: "Dermatologist" },
  ];

  return (
    <div className="py-28 w-[90%] mx-auto flex flex-col justify-center items-center">
      <div className="w-full">
        <DropdownMenu className="w-1/2">
          <DropdownMenuTrigger className="px-10 py-2 bg-primary rounded-md flex items-center gap-3 text-xl text-background">
            Filter <IoMdFunnel />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-1/2">
            <DropdownMenuSeparator />
            {doctorFields.map((item, index) => (
              <DropdownMenuItem key={index} className="text-xl">{item.field}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full">
        <DoctorsInfo />
      </div>
    </div>
  );
};

export default Doctors;