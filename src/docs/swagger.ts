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
    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                    description: "User's first name",
                  },
                  lastName: {
                    type: "string",
                    description: "User's last name",
                  },
                  email: {
                    type: "string",
                    description: "User's email",
                  },
                  phone: {
                    type: "string",
                    description: "User's phone number",
                  },
                  password: {
                    type: "string",
                    description: "User's password",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          409: {
            description:
              "Conflict - User with similar information already exists",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Authentication"],

        summary: "Login as a user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  phoneOrEmail: {
                    type: "string",
                    description: "User's phone number or email",
                  },
                  password: {
                    type: "string",
                    description: "User's password",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          401: {
            description: "Unauthorized - Incorrect password",
          },
          404: {
            description: "Not Found - User with given profile not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/google": {
      get: {
        tags: ["Authentication"],
        summary: "Google OAuth login",
        operationId: "googleOAuthLogin",
        responses: {
          "200": {
            description: "OK - Google OAuth login successful",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/account/update-info": {
      put: {
        tags: ["Account"],
        summary: "Update user information",
        description: "Update user information based on the provided data.",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User data for updating information",
            required: true,
            schema: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  description: "User's first name",
                },
                lastName: {
                  type: "string",
                  description: "User's last name",
                },
                phone: {
                  type: "string",
                  description: "User's phone number",
                },
                email: {
                  type: "string",
                  description: "User's email Account",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "User information updated successfully",
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/account/upload-image": {
      post: {
        tags: ["Account"],
        summary: "Upload user image",
        description: "Upload a user's image file.",
        parameters: [
          {
            in: "formData",
            name: "image",
            description: "User's image file",
            required: true,
            type: "file",
          },
        ],
        responses: {
          "200": {
            description: "Image uploaded successfully",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/account/set-password": {
      put: {
        tags: ["Account"],
        summary: "Set user password",
        description: "Set a new password for the user.",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User's new password",
            required: true,
            schema: {
              type: "object",
              properties: {
                newPassword: {
                  type: "string",
                  description: "New password for the user",
                },
                confirmPassword: {
                  type: "string",
                  description: "Confirmation of the new password",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Password set successfully",
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/account/change-password": {
      put: {
        tags: ["Account"],
        summary: "Change user password",
        description: "Change the user's password.",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User's current and new passwords",
            required: true,
            schema: {
              type: "object",
              properties: {
                currentPassword: {
                  type: "string",
                  description: "User's current password",
                },
                newPassword: {
                  type: "string",
                  description: "User's new password",
                },
                confirmNewPassword: {
                  type: "string",
                  description: "Confirmation of the new password",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Password changed successfully",
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/account/info": {
      get: {
        tags: ["Account"],
        summary: "Get user information",
        description: "Get user information based on query parameters.",
        parameters: [
          {
            in: "query",
            name: "userId",
            description: "Include user ID in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "firstName",
            description: "Include user's first name in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "lastName",
            description: "Include user's last name in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "image",
            description: "Include user's image in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "email",
            description: "Include user's email in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "phone",
            description: "Include user's phone number in the response",
            type: "boolean",
          },
          {
            in: "query",
            name: "createdAt",
            description: "Include user's creation date in the response",
            type: "boolean",
          },
        ],
        responses: {
          "200": {
            description: "User information retrieved successfully",
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};
