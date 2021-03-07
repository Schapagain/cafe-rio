import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleMeal from "./SingleMeal";
import { addMealToOrder } from "../actions/orderActions";
import Skeleton from "@material-ui/lab/Skeleton";


const Meals = ({ meal, filter, addMealToOrder }) => {

  let { meals, isLoading } = meal;
  meals = meals.filter((meal) => meal.category === filter.toLowerCase());
  return (
    <div className="flex w-full my-10 flex-col h-full">
      <h1 className="font-medium w-1/2 text-black mx-auto bg-opacity-20 bg-gray-200 rounded-xl text-center text-3xl p-2 mb-5 mt-5">
        {filter}
      </h1>
      {(isLoading || meals.length) 
      ? (<div className="flex w-full justify-center h-full flex-wrap">
        {(isLoading 
        ? Array.from(new Array(4)) 
        : meals).map((meal, index) => meal 
          ? ( <SingleMeal
                  key={meal.id || index}
                  meal={meal}
                  addToOrder={(meal) => {
                    addMealToOrder(meal);
                  }}
                />) 
          : ( <Skeleton
                  key={index}
                  animation="wave"
                  variant="rect"
                  width={300}
                  height={200}
                />
            )
          )
        }
      </div>
      ) : (
        <div className="h-96 flex text-black text-xl sm:text-2xl">
          <h1 className="m-auto bg-red-300 p-3 rounded-lg">Sorry, couldn't get {filter ? filter.toLowerCase() : "meal"} right now</h1>
        </div>
      )}
    </div>
    );
};

Meals.propTypes = {
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
  order: state.order.order,
});

export default connect(mapStateToProps, { addMealToOrder })(Meals);
