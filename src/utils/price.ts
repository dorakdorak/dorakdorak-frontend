export const getDiscountedPrice = (price: number, discountPercent: number): number => {
  const discounted = price * (1 - discountPercent / 100);
  return Math.floor(discounted / 100) * 100;
};
