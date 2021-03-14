import CartSingleMeal from "./CartSingleMeal";
export default function OrderInfo({
  meals,
  addMealToOrder,
  removeMealFromOrder,
  total,
}) {
  return (
    <div className="w-full items-end flex flex-col h-4/5">
      <Items
        meals={meals}
        addMealToOrder={addMealToOrder}
        removeMealFromOrder={removeMealFromOrder}
      />
      <Seperator />
      <Total total={total} />
    </div>
  );
}

const Items = ({ meals, addMealToOrder, removeMealFromOrder }) => (
  <div className="w-full h-3/4 overflow-y-auto flex flex-col">
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
