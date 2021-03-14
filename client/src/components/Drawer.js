import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import Button from "./Button";
import CartSingleMeal from "./CartSingleMeal";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";

const Leaf = ({ cartOpen, setCartOpen, numItems }) => {
  const transitions = useTransition(cartOpen, null, {
    from: { transform: "translate3d(-250%,0,0)" },
    enter: { transform: "translate3d(50%,0,0)" },
    leave: { transform: "translate3d(-250%,0,0)" },
    reverse: cartOpen,
    unique: true,
    reset: true,
    initial: { transform: "translate3d(100%,0,0)" },
  });
  return (
    <>
      {transitions.map(({ key, props }) => (
        <animated.div
          key={key}
          style={props}
          onClick={() => setCartOpen(!cartOpen)}
          className="bg-theme-color text-offwhite cursor-pointer z-40 fixed rounded-full top-1/2 transform -translate-y-1/2 right-0 w-32 h-32"
        >
          <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-full top-1/2 text-5xl">
            <AiOutlineShoppingCart className="transform  -scale-x-100" />
            {numItems > 0 && (
              <div className="absolute text-white top-0 left-0 bg-theme-color h-5 w-5 flex items-center text-xs justify-center p-3 rounded-full">
                {numItems}
              </div>
            )}
          </div>
        </animated.div>
      ))}
    </>
  );
};

const Items = ({ meals, addMealToOrder, removeMealFromOrder }) => (
  <div className="w-full h-full flex flex-col overflow-y-auto">
    {meals.map(({ meal, quantity }) => (
      <CartSingleMeal
        key={meal.id}
        meal={meal}
        quantity={quantity}
        handleAddOne={addMealToOrder}
        handleSubtractOne={removeMealFromOrder}
      />
    ))}
  </div>
);

const Seperator = () => <div className="h-1 mr-2 my-5 w-1/2 bg-offwhite"></div>;
const Total = ({ total }) => <div className="mr-2">${total}</div>;
const CheckoutButton = () => (
  <Button text="Checkout" className="mx-auto mb-10" />
);

export const Drawer = ({ order, addMealToOrder, removeMealFromOrder }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const orderMap = (order && order.meals) || new Map();
  const mealsInOrder = Array.from(orderMap.values());
  const numItems = order.totalMeals;
  const total = order.totalPrice;

  const transitions = useTransition(cartOpen, null, {
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    leave: { transform: "translate3d(100%,0,0)" },
  });

  return (
    <div className="select-none">
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className="text-white bg-theme-color z-50 fixed cursor-pointer flex flex-col h-screen w-96 top-0 right-0"
              key={key}
              style={props}
            >
              <h1 className="p-3 w-full pt-10 mb-10 bg-gray-600 bg-opacity-50 text-center text-3xl">
                Your bag
              </h1>
              <div className="p-5 w-full overflow-y-auto flex flex-col items-end h-full">
                {numItems > 0 ? (
                  <>
                    <Items
                      meals={mealsInOrder}
                      addMealToOrder={addMealToOrder}
                      removeMealFromOrder={removeMealFromOrder}
                    />
                    <Seperator />
                    <Total total={total} />
                    <CheckoutButton />
                  </>
                ) : (
                  <p className="m-auto">Oops your cart is empty</p>
                )}
              </div>
            </animated.div>
          )
      )}
      <Leaf cartOpen={cartOpen} setCartOpen={setCartOpen} numItems={numItems} />
    </div>
  );
};

Drawer.propTypes = {
  order: PropTypes.object.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
  removeMealFromOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order.order,
});

export default connect(mapStateToProps, {
  addMealToOrder,
  removeMealFromOrder,
})(Drawer);
