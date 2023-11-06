import { Prisma } from "@prisma/client";
import { FilterProductRquestBodyTypes } from "../interfaces/products.interface";

export function getOrderProductOption(
  requestBody: FilterProductRquestBodyTypes
): Prisma.productsOrderByWithRelationInput {
  const { orderBy } = requestBody;

  if (orderBy === "newset") {
    return { createdAt: "asc" };
  } else if (orderBy === "cheapest") {
    return { finalPrice: "asc" };
  } else if (orderBy === "mostExpensive") {
    return {
      finalPrice: "desc",
    };
  } else {
    return {};
  }
}

export function getFilterProductOption(
  requestBody: FilterProductRquestBodyTypes
): Prisma.productsWhereInput {
  const { colorIds, categoryIds, minPrice, maxPrice, extence, hasDiscount } =
    requestBody;

  let colorCondition: Prisma.productsWhereInput = {};

  if (colorIds) {
    colorCondition = {
      inventories: {
        every: {
          OR: colorIds.map((colorId) => {
            return {
              colorId,
            };
          }),
        },
      },
    };
  }

  let categoryCondition: Prisma.productsWhereInput = {};
  if (categoryIds) {
    categoryCondition = {
      OR: categoryIds?.map((categoryId) => {
        return {
          categoryId: {
            equals: categoryId,
          },
        };
      }),
    };
  }

  let priceCondition: Prisma.productsWhereInput = {};
  if (minPrice && maxPrice) {
    priceCondition = {
      AND: [
        { finalPrice: { gte: Number(minPrice) || 0 } },
        { finalPrice: { lte: Number(maxPrice) || 100000000000000 } },
      ],
    };
  }

  let extenceCondition: Prisma.productsWhereInput = {};
  if (extence) {
    extenceCondition = {
      inventories: {
        every: {
          AND: {
            quantity: {
              gt: 0,
            },
          },
        },
      },
    };
  }
  let hasDiscountCondition: Prisma.productsWhereInput = {};
  if (hasDiscount) {
    hasDiscountCondition = { discountStatus: 1 };
  }

  const filterConditions: Prisma.productsWhereInput = {
    ...colorCondition,
    ...categoryCondition,
    ...priceCondition,
    ...extenceCondition,
    ...hasDiscountCondition,
  };
  return filterConditions;
}
