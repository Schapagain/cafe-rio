import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Meals from "./Meals";
import { connect } from "react-redux";
import { getMeals } from '../actions/mealActions';

const Menu = ({getMeals,className}) => {

  useEffect(() => {
    getMeals();
  })

  return (
    <div className={`${className} max-w-screen-xl flex flex-col p-5 m-auto`}>
        <Meals filter="HOT DRINKS"/>
        <Meals filter="COLD DRINKS"/>
        <Meals filter="PASTRIES" />
        <Meals filter="STARTERS" />
        <Meals filter="ENTREES" />
    </div>
  );
};

Menu.propTypes = {
  getMeals: PropTypes.func.isRequired
};

export default connect(null, { getMeals })(Menu);
