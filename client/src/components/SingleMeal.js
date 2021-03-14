import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

export default function SingleMeal({ meal, addToOrder }) {
  const { name, price } = meal;
  return (
    <div className=" my-2 w-full cursor-pointer flex flex-col">
      <div
        onClick={() => addToOrder(meal)}
        className="h-full w-full rounded-xl flex relative"
      >
        <div className="h-full p-1 flex w-full transition duration-500 ease-in-out hover:opacity-50">
          <div className="flex w-full my-auto justify-between">
            <p className="text-2xl">{name}</p>
            <p className="my-auto text-xl">
              ${(price && Number(meal.price).toFixed(2)) || "inf"}
            </p>
          </div>
        </div>
        <div className="  p-2 rounded-2xl bg-theme-color mx-auto w-full z-30 opacity-0 hover:opacity-70 transition duration-500 ease-in-out absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MdAddShoppingCart className="m-auto rounded-full text-3xl" />
        </div>
      </div>
    </div>
  );
}
