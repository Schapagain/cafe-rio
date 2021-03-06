import React from "react";
import { MdAddShoppingCart } from 'react-icons/md';

function Image({url}) {
  return (
      <img 
      className=" cursor-pointer rounded-xl w-full max-h-80 h-full object-cover" 
      src={url} 
      alt="cafe food option" /> 
  )
}

export default function SingleMeal({meal,addToOrder}) {
  const {name,picture,price} = meal;
  return (
    <div className="w-full p-2 flex justify-center flex-col h-full">
      <div 
      onClick={()=>addToOrder(meal)} 
      className="h-2/3 w-full bg-theme-color rounded-xl flex relative"
      >
        <div 
        className="w-full h-full z-30 transition duration-500 ease-in-out hover:opacity-50"
        >
          <Image url={picture}/>  
        </div>
        <div className="z-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MdAddShoppingCart className="my-auto p-1 rounded-full text-6xl"/>
        </div>
      </div>
      <div className="justify-between mt-2 flex">
        <div className="flex my-auto text-white bg-theme-color p-1 rounded-bl-xl rounded-tr-xl">
          <p className="text-xl">{name}</p>
          <p className="ml-2 my-auto">${(price && Number(meal.price).toFixed(2)) || 'inf'}</p>   
        </div>
      </div>
    </div>
  )
}