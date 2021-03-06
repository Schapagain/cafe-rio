import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SingleMeal from "./SingleMeal";
import { addMealToOrder } from "../actions/orderActions";
// import Spinner from "./Spinner";
import Skeleton from "@material-ui/lab/Skeleton";


const Meals = ({ meal, filter, addMealToOrder }) => {

  let { meals, isLoading } = meal;
  meals = meals.filter((meal) => meal.category === filter.toLowerCase());
  return (
    <div className="flex flex-col h-full sm:h-96">
      <h1 className="font-medium w-1/2 text-black mx-auto bg-opacity-20 bg-gray-200 rounded-xl text-center text-3xl p-2 mt-10">
        {meals.length ? filter : null}
      </h1>
      <div className="flex w-full mx-auto flex-col overflow-y-auto sm:flex-row sm:overflow-x-auto">
        {(isLoading 
        ? Array.from(new Array(4)) 
        : meals).map((meal, index) => meal 
          ? ( <SingleMeal
                  meal={meal}
                  addToOrder={(meal) => {
                    addMealToOrder(meal);
                  }}
                />) 
          : ( <Skeleton
                  animation="wave"
                  variant="rect"
                  width={300}
                  height={200}
                />
            )
          )
        }
      </div>
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
