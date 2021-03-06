import React, { useState } from "react";
import Meals from "./Meals";
import classNames from 'classnames';
import { a, useTransition } from 'react-spring';

const FilterButton = ({ text, toggleCategory, isOn }) => {

  const mainClass = classNames(
    'bg-red-400 sm:my-auto select-none text-xs flex rounded-full p-2 m-2 cursor-pointer',
    'transition duration-500 ease-in-out hover:bg-opacity-50',
    {
      'text-base' : isOn,
      'bg-green-700' : isOn,
      'text-black' : !isOn,
    },
  );

  return (
    <div 
    className={mainClass}
    onClick = {()=>toggleCategory(text)}
    >
      <p className="m-auto">{text}</p>
    </div>
  )
}

const Filterbar = ({ filtersSelected, toggleCategory, filters}) => {
  return (
    <div className="sticky top-0 sm:h-14 flex-wrap flex bg-opacity-60 justify-center z-50 p-2 rounded-xl bg-gray-400">
        {filters.map(filter => (
        <FilterButton 
        key={filter}
        isOn={filtersSelected.includes(filter)} 
        toggleCategory={toggleCategory} 
        text={filter} 
        />))}
    </div>
  )
}

export default function Menu({ className }) {

  const filters = ["HOT DRINKS","COLD DRINKS","PASTRIES","STARTERS","ENTREES"];
  const [filtersSelected,setFiltersSelected] = useState(filters);
 
  const transitions = useTransition(filtersSelected,null,{
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    unique: true,
  });

  const toggleCategory = (category) => {
    if (filtersSelected.includes(category)) {
      const newFiltersSelected = filtersSelected.filter((filter)=>filter !== category);
      setFiltersSelected(newFiltersSelected);
    } else {
      setFiltersSelected([...filtersSelected,category]);
    }
  }
  return (
    <div className={`${className} relative w-full min-h-screen max-w-screen-xl flex flex-col p-5 m-auto`}>
        <Filterbar 
        filters={filters} 
        filtersSelected={filtersSelected} 
        toggleCategory={toggleCategory}
        />
        {transitions.map(({item,key,props}) => (
          <a.div key={key} style={props}>
            <Meals filter={item} />  
          </a.div>
        ))}  
    </div>
  );
};