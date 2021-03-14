import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import CheckoutConfirmation from "./CheckoutConfirmation";
import PaymentForm from "./PaymentForm";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { PAYMENT_STATUS } from "../utils/constants";
import OrderInfo from "./OrderInfo";
import { addMealToOrder, removeMealFromOrder } from "../actions/orderActions";
import { createPaymentIntent } from "../actions/paymentActions";
import Button from "./Button";

const Checkout = ({
  isAuthenticated,
  addMealToOrder,
  removeMealFromOrder,
  createPaymentIntent,
  order,
  payment,
}) => {
  let history = useHistory();

  const orderMap = (order && order.meals) || new Map();
  const mealsInOrder = Array.from(orderMap.values());
  const total = order.totalPrice;

  const [orderChanged, setOrderChanged] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        state: { checkoutFail: true },
      });
    }
    {
      createPaymentIntent();
      setOrderChanged(false);
    }
  }, [
    orderChanged,
    createPaymentIntent,
    setOrderChanged,
    history,
    isAuthenticated,
  ]);

  return (
    <div className="flex w-full justify-around">
      <div className=" w-2/3 3xl:w-1/3 select-none p-20 flex flex-col h-screen max-w-screen-xl m-auto">
        {payment.status === PAYMENT_STATUS.success ? (
          <Paper>
            <CheckoutConfirmation />
          </Paper>
        ) : (
          <div className="h-2/3 flex flex-col text-white">
            <h1 className="text-center text-3xl pb-5">REVIEW YOUR ORDER</h1>
            {order.totalMeals > 0 ? (
              <>
                <OrderInfo
                  meals={mealsInOrder}
                  addMealToOrder={(meal) => {
                    setOrderChanged(true);
                    addMealToOrder(meal);
                  }}
                  removeMealFromOrder={(mealId) => {
                    setOrderChanged(true);
                    removeMealFromOrder(mealId);
                  }}
                  total={total}
                />
                <PaymentForm orderChanged={orderChanged} />
              </>
            ) : (
              <div className="m-auto">
                <p className="text-3xl">Oops your bag looks empty</p>
                <Button
                  text="Continue shopping"
                  onClick={() => history.push("/menu")}
                  className="w-1/2 bg-theme-color"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  order: state.order.order,
  payment: state.payment,
});

export default connect(mapStateToProps, {
  addMealToOrder,
  removeMealFromOrder,
  createPaymentIntent,
})(Checkout);
