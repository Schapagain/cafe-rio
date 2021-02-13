export class Order {
  constructor(order = null, type = "dinein") {
    this.order = order ? new Map(order) : new Map();
    this.mealIds = this.createMealIdArray(this.order);
    this.type = type ? type : "dinein";
    this.time = 1;
  }

  createMealIdArray(order) {
    if (!order) return [];

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

  setTime(time) {
    this.time = time;
  }

  setType(type) {
    this.type = type;
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

  get orderTime() {
    return this.time;
  }

  get orderType() {
    return this.type;
  }

  get meals() {
    return this.order;
  }

  get totalMeals() {
    return [...(this.order.values())].reduce((acc,val)=>val.quantity + acc, 0);
  }

  get totalPrice() {
    if (!this.order) return 0;

    let orderPrice = 0;
    this.order.forEach(({ meal, quantity }) => {
      orderPrice += meal.price * quantity;
    });
    return orderPrice.toFixed(2);
  }

  get jsonStringifiedOrder() {
    return JSON.stringify(Array.from(this.order.entries()));
  }
}
