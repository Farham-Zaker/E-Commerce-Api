function discountCalculator(price: number, discountPercent: number): number {
  const discpuntAmount = price * (discountPercent / 100);
  return price - discpuntAmount;
}
export default discountCalculator;
