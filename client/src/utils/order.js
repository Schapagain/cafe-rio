export class Order {
  constructor(order, type) {
    // this.user = user;
    this.order = new Map(order);
    this.mealIds = this.createMealIdArray(this.order);
    // this.payment = payment;
    this.type = type ? type : "dinein";
  }

  createMealIdArray(order) {
    const mealIds = Array.from(order.keys());
    return mealIds
      .map((id) => {
        const quantity = order.get(id).quantity;
        return Array(quantity).fill(id);
      })
      .flat();
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
    return [...(this.order.values())].reduce((acc,val)=>val.quantity + acc, 0);
  }

  get totalPrice() {
    let orderPrice = 0;
    this.order.forEach(({ meal, quantity }) => {
      orderPrice += meal.price * quantity;
    });
    return orderPrice;
  }

  get jsonStringifiedOrder() {
    return JSON.stringify(Array.from(this.order.entries()));
  }
}
