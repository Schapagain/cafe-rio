import React from "react";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const IntroText = () => {
  return (
    <div className="z-50 text-center text-white">
      <p className="text-3xl sm:text-4xl lg:text-5xl mb-4">
        A place to recharge yourself
      </p>
      <div className="text-xl sm:text-2xl lg:text-3xl">
        <p>Drink some coffee.</p>
        <p>Grab a snack.</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const history = useHistory();

  const animation = useSpring({
    to: { transform: "translateY(0%)" },
    from: { transform: "translateY(-5%)" },
  });

  return (
    <div className="flex justify-center lg:justify-start mx-auto w-full max-w-screen-xl h-2/3 my-auto">
      <animated.div
        style={animation}
        className="flex lg:ml-20 flex-col my-auto"
      >
        <IntroText />
        <Button
          className="rounded-full bg-theme-color"
          text="See menu"
          onClick={() => history.push("/menu")}
        />
      </animated.div>
    </div>
  );
};

export default HomePage;
