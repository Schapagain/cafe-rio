export class Order {
  constructor(order, type) {
    // this.user = user;
    this.order = new Map(order);
    this.mealIds = Array.from(this.order.keys());
    // this.payment = payment;
    this.type = type ? type : "dinein";
  }
  createOrderMap(order) {
    let mealMap = new Map();
    order.forEach((meal) => {
      if (mealMap.has(meal.id)) {
        mealMap.set(meal.id, { meal, quantity: this.order.quantity + 1 });
      } else {
        mealMap.set(meal.id, { meal, quantity: 0 });
      }
    });
    return mealMap;
  }

  addMeal(meal) {
    this.order.set(meal.id, {
      meal,
      quantity: this.order.has(meal.id)
        ? this.order.get(meal.id).quantity + 1
        : 1,
    });
    this.mealIds.push(meal.id);
  }

  removeMeal(mealId) {
    if (!this.order.has(mealId)) return;
    if (this.order.get(mealId).quantity === 1) {
      this.order.delete(mealId);
      return;
    }
    this.order.set(mealId, {
      ...this.order.get(mealId),
      quantity: this.order.get(mealId).quantity - 1,
    });
    this.mealIds.splice(mealId, 1);
  }

  getOrderDetails() {
    return this.order;
  }

  get meals() {
    return this.order;
  }

  get totalMeals() {
    return this.order.size;
  }

  get totalPrice() {
    let mealPrices = 0;
    this.order.forEach(({ meal, quantity }) => {
      mealPrices += +meal.price * +quantity;
    });
    return mealPrices;
  }

  get jsonStringifiedOrder() {
    return JSON.stringify(Array.from(this.order.entries()));
  }
}
