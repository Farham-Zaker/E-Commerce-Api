import discountCalculator from "./discountCalculator";

function getFinalPrice(
  discountStatus: boolean,
  productDiscountPercent: number | null,
  discountPercent: number,
  price: number
) {
  if (discountStatus) {
    return discountCalculator(price, discountPercent);
  }
  if (!productDiscountPercent) {
    return price;
  }
  if (productDiscountPercent) {
    return discountCalculator(price, productDiscountPercent);
  }
  if (!discountStatus) {
    return discountCalculator(price, productDiscountPercent);
  }
  return price;
}

export default getFinalPrice;
