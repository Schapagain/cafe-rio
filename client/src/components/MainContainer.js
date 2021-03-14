import React from "react";
import SignIn from "./SignIn";
import HomePage from "./HomePage";
import Checkout from "./Checkout";
import Menu from "./Menu";
import SignUp from "./SignUp";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import About from "./About";
import Drawer from "./Drawer";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function MainContainer({ order }) {
  return (
    <div className="w-full h-full flex">
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => (
            <div className="w-full h-screen bg-opacity-30 p-5 bg-cover bg-coffee-on-desk-dark justify-center flex flex-col">
              <NavBar
                activeLink="login"
                className="z-50 rounded-xl text-white"
              />
              <SignIn {...props.location.state} />
            </div>
          )}
        />
        <Route exact path="/about">
          <div className="w-full h-screen p-5 bg-cover bg-coffee-on-desk-dark justify-center flex flex-col">
            <NavBar activeLink="about" className="z-50 rounded-x text-white" />
            <About className="text-offwhite" />
          </div>
        </Route>
        <Route exact path="/signup">
          <div className="w-full min-h-screen bg-opacity-30 p-5 bg-cover bg-coffee-on-desk-dark justify-center flex flex-col">
            <NavBar
              activeLink="signup"
              className="z-50 rounded-xl text-white"
            />
            <SignUp />
          </div>
        </Route>
        <Route exact path="/checkout">
          <div className="w-full h-screen bg-opacity-30 p-5 bg-cover bg-coffee-on-desk-dark justify-center flex flex-col">
            <Checkout />
          </div>
        </Route>
        <Route exact path="/menu">
          <div className="w-full h-full bg-opacity-30 p-5 bg-cover bg-coffee-on-desk-dark justify-center flex flex-col">
            <NavBar activeLink="menu" className="z-30 rounded-xl text-white" />
            <Menu className="text-offwhite z-30" />
            <Drawer />
          </div>
        </Route>
        <Route path="/">
          <div className="w-full h-screen p-5 bg-cover bg-coffee-on-desk justify-center flex flex-col">
            <NavBar showCart={true} className="z-50 text-white" />
            <HomePage />
            {order && order.totalMeals && <Drawer />}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  order: state.order.order,
});

MainContainer.propTypes = {
  order: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(MainContainer);
