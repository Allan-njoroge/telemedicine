import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import React from "react";

const Cards = () => {
  const cardInfo = [
    { title: "Lorem", number: 10 },
    { title: "Lorem", number: 10 },
    { title: "Lorem", number: 10 },
  ];

  // const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex justify-between px-5">
        <h1 className="text-2xl">Allan's Dashboard Overview</h1>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Book Appointment</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Book An Appointment</AlertDialogTitle>
              <AlertDialogDescription>
                <form action="">
                  <div className="w-full grid">
                    <label htmlFor="">Select Speciality</label>
                    <select name="" id="">
                      <option value="">Doctor</option>
                    </select>
                  </div>
                  <div className="w-full grid">
                    <label htmlFor="">Select Type of Service</label>
                    <select name="" id="">
                      <option value="">Doctor</option>
                    </select>
                  </div>
                  {/* <div>
                    <label htmlFor="">Choose a date</label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div> */}
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-evenly gap-5 px-10 md:gap-10">
        {cardInfo.map((item, index) => (
          <div
            key={index}
            className="w-full bg-primary/20 md:py-10 md:px-20 py-5 px-10 rounded-md text-center"
          >
            <h1 className="text-4xl font-bold">{item.number}</h1>
            <p className="text-2xl">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
