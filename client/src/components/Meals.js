import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleMeal from "./SingleMeal";
import { addMealToOrder } from "../actions/orderActions";
import Skeleton from "@material-ui/lab/Skeleton";
import { MdUnfoldMore } from "react-icons/md";

const MAX_DISPLAY_COUNT_DEFAULT = 5;

const FilterDisplayImage = ({ className, images }) => {
  return (
    <div className={className + " hidden p-5 justify-center lg:flex h-96"}>
      <img
        className="w-full rounded-xl object-cover h-full"
        src={images[1] || images[0]}
        alt="food or drink"
      />
    </div>
  );
};

const FilterMenu = ({
  meals,
  isLoading,
  filter,
  className,
  addMealToOrder,
  displayCount,
}) => {
  return (
    <div className={className + " flex w-full p-5 flex-col"}>
      <h2 className="text-4xl">{filter}</h2>
      <div className="flex flex-col w-full justify-items-start justify-start h-full">
        {(isLoading ? Array.from(new Array(3)) : meals)
          .slice(0, displayCount)
          .map((meal, index) =>
            meal ? (
              <SingleMeal
                key={meal.id || index}
                meal={meal}
                addToOrder={(meal) => {
                  addMealToOrder(meal);
                }}
              />
            ) : (
              <Skeleton
                key={index}
                animation="wave"
                variant="rect"
                width={300}
                height={100}
              />
            )
          )}
      </div>
    </div>
  );
};

const Meals = ({ meal, filter, flexOrder, addMealToOrder }) => {
  let { meals, isLoading } = meal;
  meals = meals.filter((meal) => meal.category === filter.toLowerCase());
  const [toggled, setToggled] = useState(false);
  return isLoading || meals.length ? (
    <div
      className={`flex  w-full mb-10 h-full  ${
        flexOrder ? "flex-row-reverse lg:mr-10" : "flex-row lg:ml-10"
      }`}
    >
      <FilterDisplayImage
        className="w-1/2"
        images={meals.map((meal) => meal.picture)}
      />
      <FilterMenu
        className="w-1/4"
        filter={filter}
        isLoading={isLoading}
        meals={meals}
        displayCount={toggled ? meals.length : MAX_DISPLAY_COUNT_DEFAULT}
        addMealToOrder={addMealToOrder}
      />
      <div className="w-1/4 hidden lg:flex">
        {MAX_DISPLAY_COUNT_DEFAULT < meals.length && (
          <MdUnfoldMore
            onClick={() => setToggled(!toggled)}
            className="m-auto p-2 rounded-full bg-theme-color cursor-pointer text-6xl"
          />
        )}
      </div>
    </div>
  ) : null;
};

Meals.propTypes = {
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
  order: state.order.order,
});

export default connect(mapStateToProps, { addMealToOrder })(Meals);
