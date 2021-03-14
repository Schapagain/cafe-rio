import React from "react";
import Meals from "./Meals";
import { a, useTransition, config } from "react-spring";

export default function Menu({ className }) {
  const filters = ["HOT DRINKS", "COLD DRINKS", "PASTRIES", "SALADS"];

  const transitions = useTransition(filters, null, {
    from: (filter) => ({
      transform: `translate3d(${
        filters.indexOf(filter) % 2 ? "-20%" : "20%"
      },0,0)`,
    }),
    enter: { transform: "translate3d(0%,0,0)" },
    unique: true,
    config: config.slow,
  });

  return (
    <div
      className={`${className} overflow-x-hidden relative select-none rounded-2xl bg-opacity-40 w-full min-h-screen max-w-screen-xl flex justify-center flex-col mr-10 p-20 xl:m-auto`}
    >
      {transitions.map(({ item, key, props }, index) => (
        <a.div key={key} style={props}>
          <Meals filter={item} flexOrder={index % 2} />
        </a.div>
      ))}
    </div>
  );
}
