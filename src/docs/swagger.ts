import config from "../config/config";
const port: number = config.port;

export default {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "E Commerce Api", // short title.
    version: "1.0.0", // version number
    contact: {
      name: "Farham Zaker",
      email: "farham.zaler007@gmail.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: "E Commerce Api",
    },
  ],
  paths: {
    "/products": {
      get: {
        tags: ["Products"],
        summary: "Get all products",
        operationId: "getAllProducts",
        responses: {
          "200": {
            description: "OK",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/products/{productId}": {
      get: {
        tags: ["Products"],
        summary: "Get a product by ID",
        operationId: "getProductById",
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/products/getByFilter": {
      get: {
        tags: ["Products"],
        summary: "Get products by filter",
        operationId: "getProductsByFilter",
        parameters: [
          {
            name: "orderBy",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "colorIds",
            in: "query",
            schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          {
            name: "minPrice",
            in: "query",
            schema: {
              type: "number",
            },
          },
          {
            name: "maxPrice",
            in: "query",
            schema: {
              type: "number",
            },
          },
          {
            name: "extence",
            in: "query",
            schema: {
              type: "boolean",
            },
          },
          {
            name: "hasDiscount",
            in: "query",
            schema: {
              type: "boolean",
            },
          },
          {
            name: "take",
            in: "query",
            required: true,
            schema: {
              type: "number",
            },
          },
          {
            name: "skip",
            in: "query",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/products/search": {
      get: {
        tags: ["Products"],
        summary: "Search products",
        operationId: "searchProducts",
        parameters: [
          {
            name: "searchTerm",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "take",
            in: "query",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};
