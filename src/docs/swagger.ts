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
    "/addresses/add": {
      post: {
        tags: ["Addresses"],
        summary: "Add a new user address",
        operationId: "addUserAddress",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  country: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  zone: {
                    type: ["string", "null"],
                  },
                  apartmentUnite: {
                    type: ["number", "null"],
                  },
                  postalCode: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/addresses/get": {
      get: {
        tags: ["Addresses"],
        summary: "Get user addresses",
        operationId: "getUserAddresses",
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
    "/addresses/get/{addressId}": {
      get: {
        tags: ["Addresses"],
        summary: "Get user address by ID",
        operationId: "getAddressById",
        parameters: [
          {
            name: "addressId",
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
    "/addresses/update": {
      put: {
        tags: ["Addresses"],
        summary: "Update user addresses",
        operationId: "updateUserAddresses",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  addressId: {
                    type: "string",
                  },
                  newAddress: {
                    type: "object",
                    properties: {
                      country: {
                        type: "string",
                      },
                      state: {
                        type: "string",
                      },
                      city: {
                        type: "string",
                      },
                      zone: {
                        type: "string",
                      },
                      apartmentUnite: {
                        type: "number",
                      },
                      postalCode: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
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
    "/addresses/delete/{addressId}": {
      delete: {
        tags: ["Addresses"],
        summary: "Delete user address by ID",
        operationId: "deleteUserAddress",
        parameters: [
          {
            name: "addressId",
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
    "/likes/add": {
      post: {
        summary: "Add a product to likes",
        tags: ["Likes"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID to add to likes",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product added to likes",
          },
          "404": {
            description: "Product not found",
          },
          "409": {
            description: "Product already in likes",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/likes/get": {
      get: {
        summary: "Get all liked products",
        tags: ["Likes"],
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
    "/likes/delete/{productId}": {
      delete: {
        summary: "Delete a product from likes",
        tags: ["Likes"],
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Product ID to delete from likes",
          },
        ],
        responses: {
          "200": {
            description: "Product deleted from likes",
          },
          "404": {
            description: "Product not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/add": {
      post: {
        summary: "Add a comment",
        tags: ["Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  comment: {
                    type: "string",
                    description: "The comment text.",
                  },
                  productId: {
                    type: "string",
                    description: "The ID of the product.",
                  },
                  replyId: {
                    type: "string",
                    description:
                      "The ID of the comment being replied to (optional).",
                    nullable: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Comment added successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/get": {
      get: {
        summary: "Get user comments",
        tags: ["Comments"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User comments retrieved successfully",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/update": {
      put: {
        summary: "Update a comment",
        tags: ["Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  commentId: {
                    type: "string",
                    description: "The ID of the comment to be updated.",
                  },
                  comment: {
                    type: "string",
                    description: "The updated comment text.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Comment updated successfully",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/delete/{commentId}": {
      delete: {
        summary: "Delete a comment",
        tags: ["Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "commentId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Product ID to delete from likes",
          },
        ],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Comment deleted successfully",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/cart/add": {
      post: {
        summary: "Add a product to the cart",
        tags: ["Cart"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "body",
            name: "body",
            description: "Product information to add to the cart",
            required: true,
            schema: {
              type: "object",
              properties: {
                productId: {
                  type: "string",
                },
                colorId: {
                  type: "string",
                },
                quantity: {
                  type: "number",
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Product added to the cart successfully",
          },
          400: {
            description: "Invalid request or insufficient product quantity",
          },
          404: {
            description:
              "The requested product is not available or does not exist",
          },
        },
      },
    },
    "/cart/get": {
      get: {
        summary: "Get all items in the cart",
        tags: ["Cart"],
        paramaters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "List of items in the cart",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/cart/get/{cartId}": {
      get: {
        summary: "Get a specific item in the cart by cartId",
        tags: ["Cart"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "cartId",
            description: "Cart ID to retrieve the item",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Item retrieved successfully",
          },
          404: {
            description: "The requested cart item was not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/cart/update": {
      put: {
        summary: "Update the quantity of an item in the cart",
        tags: ["Cart"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "body",
            name: "body",
            description: "Cart item information to update",
            required: true,
            schema: {
              type: "object",
              properties: {
                cartId: {
                  type: "string",
                },
                colorId: {
                  type: "string",
                },
                quantity: {
                  type: "number",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Item quantity updated successfully",
          },
          400: {
            description: "Invalid request or insufficient product quantity",
          },
          404: {
            description: "The requested cart item was not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/cart/delete/{cartId}": {
      delete: {
        summary: "Delete an item from the cart by cartId",
        tags: ["Cart"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "cartId",
            description: "Cart ID to delete the item",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Item deleted from the cart successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/payments/pay": {
      post: {
        summary: "Make a payment",
        description: "Endpoint to initiate a payment process.",
        tags: ["Payments"],
        parameters: [
          {
            name: "token",
            in: "header",
            required: true,
            description: "User authentication token.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Payment request successful.",
          },
          400: {
            description: "Payment request failed.",
          },
          502: {
            description: "Payment processing issue.",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/payments/payCallback": {
      get: {
        summary: "Payment callback",
        description: "Callback for handling payment status notifications.",
        tags: ["Payments"],
        parameters: [
          {
            name: "status",
            in: "query",
            required: true,
            description: "Payment status (e.g., 'NOK' or 'OK').",
            schema: {
              type: "string",
            },
          },
          {
            name: "Authority",
            in: "query",
            required: true,
            description: "Payment authority ID.",
            schema: {
              type: "string",
            },
          },
          {
            name: "token",
            in: "query",
            required: true,
            description: "User authentication token.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Payment successful.",
          },
          400: {
            description: "Payment failed.",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/payments/get": {
      get: {
        summary: "Get user payments",
        description: "Endpoint to retrieve a user's payment history.",
        tags: ["Payments"],
        parameters: [
          {
            name: "token",
            in: "header",
            required: true,
            description: "User authentication token.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User payments retrieved successfully.",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/orders/cancel": {
      post: {
        summary: "Cancel an order",
        tags: ["Orders"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orderId: {
                    type: "string",
                    description: "The ID of the order to be canceled",
                  },
                },
                required: ["orderId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order canceled successfully",
          },
          "400": {
            description: "Unable to cancel the order",
          },
          "404": {
            description: "Order not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/orders/get": {
      get: {
        summary: "Get all orders",
        tags: ["Orders"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of all orders",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/orders/get/{orderId}": {
      get: {
        summary: "Get an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "orderId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "The ID of the order to retrieve",
          },
        ],
        responses: {
          "200": {
            description: "Order retrieved successfully",
          },
          "404": {
            description: "Order not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/addresses/create": {
      post: {
        summary: "Create a new address",
        tags: ["Admin - Addresses"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  country: {
                    type: "string",
                    description: "The country of the address.",
                  },
                  state: {
                    type: "string",
                    description: "The state of the address.",
                  },
                  city: {
                    type: "string",
                    description: "The city of the address.",
                  },
                  zone: {
                    type: "string",
                    description: "The zone of the address (optional).",
                  },
                  apartmentUnit: {
                    type: "number",
                    description: "The apartment or unit number (optional).",
                  },
                  postalCode: {
                    type: "string",
                    description: "The postal code of the address.",
                  },
                  userId: {
                    type: "string",
                    description: "The user ID associated with the address.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Address created successfully.",
          },
          "400": {
            description: "Bad request. Check the request body.",
          },
          "500": {
            description: "Internal Server Error.",
          },
        },
      },
    },
    "/admin/addresses/get": {
      get: {
        summary: "Get addresses",
        tags: ["Admin - Addresses"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "searchTerm",
            type: "string",
            description: "Filter addresses by search term (optional).",
          },
          {
            in: "query",
            name: "user",
            type: "string",
            description:
              "Filter addresses by user (optional). Should be 'true' or 'false'.",
          },
          {
            in: "query",
            name: "userId",
            type: "string",
            description: "Filter addresses by user ID (optional).",
          },
        ],
        responses: {
          "200": {
            description: "Addresses retrieved successfully.",
          },
          "500": {
            description: "Internal Server Error.",
          },
        },
      },
    },
    "/admin/addresses/update": {
      put: {
        summary: "Update an address",
        tags: ["Admin - Addresses"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  addressId: {
                    type: "string",
                    description: "The ID of the address to update.",
                  },
                  country: {
                    type: "string",
                    description: "The country of the address (optional).",
                  },
                  state: {
                    type: "string",
                    description: "The state of the address (optional).",
                  },
                  city: {
                    type: "string",
                    description: "The city of the address (optional).",
                  },
                  zone: {
                    type: "string",
                    description: "The zone of the address (optional).",
                  },
                  apartmentUnite: {
                    type: "number",
                    description: "The apartment or unit number (optional).",
                  },
                  postalCode: {
                    type: "string",
                    description: "The postal code of the address (optional).",
                  },
                  userId: {
                    type: "string",
                    description:
                      "The user ID associated with the address (optional).",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Address updated successfully.",
          },
          "400": {
            description: "Bad request. Check the request body.",
          },
          "500": {
            description: "Internal Server Error.",
          },
        },
      },
    },
    "/admin/addresses/delete/{addressId}": {
      delete: {
        summary: "Delete an address",
        tags: ["Admin - Addresses"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Address deleted successfully.",
          },
          "404": {
            description: "Address not found.",
          },
          "500": {
            description: "Internal Server Error.",
          },
        },
      },
    },
    "/admin/carts/create": {
      post: {
        summary: "Create a new cart",
        tags: ["Admin - Carts"],
        description: "Create a new cart for a user.",
        parameters: [
          {
            in: "body",
            name: "cart",
            description: "The cart object to create.",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                },
                productId: {
                  type: "string",
                },
                quantity: {
                  type: "number",
                },
                colorId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Cart created successfully",
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
    "/admin/carts/get": {
      get: {
        summary: "Get carts",
        tags: ["Admin - Carts"],
        description: "Retrieve a list of carts based on query parameters.",
        parameters: [
          {
            in: "query",
            name: "userId",
            description: "The user ID to filter by (optional).",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "productId",
            description: "The product ID to filter by (optional).",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "take",
            description: "Number of records to retrieve (optional).",
            schema: {
              type: "integer",
            },
          },
          {
            in: "query",
            name: "skip",
            description: "Number of records to skip (optional).",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of carts retrieved successfully",
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
    "/admin/carts/update": {
      put: {
        summary: "Update a cart",
        tags: ["Admin - Carts"],
        description: "Update an existing cart based on the cart ID.",
        parameters: [
          {
            in: "body",
            name: "cart",
            description: "The cart object to update.",
            required: true,
            schema: {
              type: "object",
              properties: {
                cartId: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
                productId: {
                  type: "string",
                },
                quantity: {
                  type: "number",
                },
                colorId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Cart updated successfully",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Cart not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/carts/delete/{cartId}": {
      delete: {
        summary: "Delete a cart",
        tags: ["Admin - Carts"],
        description: "Delete a cart based on the cart ID.",
        parameters: [
          {
            in: "path",
            name: "cartId",
            description: "The ID of the cart to delete.",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Cart deleted successfully",
          },
          "404": {
            description: "Cart not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/categories/create": {
      post: {
        summary: "Create a new category",
        tags: ["Admin - Categories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          description: "Category data",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the category",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Success - Category created successfully",
          },
          "409": {
            description:
              "Conflict - Category with the same name already exists",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/categories/get": {
      get: {
        summary: "Get all categories",
        tags: ["Admin - Categories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success - Returns all categories",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/categories/delete/{categoryId}": {
      delete: {
        summary: "Delete a category by ID",
        tags: ["Admin - Categories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "categoryId",
            required: true,
            description: "ID of the category to be deleted",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "Success - Category deleted successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/colors/create": {
      post: {
        summary: "Create a new color",
        tags: ["Admin - Colors"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          description: "Color data to create",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  hexCode: {
                    type: "string",
                  },
                },
                required: ["name", "hexCode"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Color created successfully",
          },
          "409": {
            description: "Color with the same name already exists",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/colors/get": {
      get: {
        summary: "Get all colors",
        tags: ["Admin - Colors"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Returne all colors.",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/colors/get/{colorId}": {
      get: {
        summary: "Get color by ID",
        tags: ["Admin - Colors"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "colorId",
            required: true,
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "Returne color base color ID.",
          },
          "404": {
            description: "Not Found - Color with the provided ID not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/colors/update": {
      put: {
        summary: "Update a color",
        tags: ["Admin - Colors"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Color updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/colors/delete/{colorId}": {
      delete: {
        summary: "Delete a color by ID",
        tags: ["Admin - Colors"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "colorId",
            required: true,
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "Color deleted successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/create": {
      post: {
        summary: "Create a new comment",
        tags: ["Admin - Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "comment",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                comment: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
                replyId: {
                  type: "string",
                  description:
                    "This field confirms witch comment is a reply. (optional).",
                },
                userId: {
                  type: "string",
                },
                productId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "201": {
            description: "Comment created successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/comments/get": {
      get: {
        summary: "Get comments",
        tags: ["Admin - Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "role",
            in: "query",
            type: "string",
            description:
              "Filter comments by role (optional). Should be 'comment' or 'reply'.",
          },
          {
            name: "user",
            in: "query",
            type: "boolean",
            description:
              "Show user details (optional). Should be 'true' or 'false'.",
          },
          {
            name: "product",
            in: "query",
            type: "boolean",
            description:
              "Show product details (optional). Should be 'true' or 'false'.",
          },
          {
            name: "reply",
            in: "query",
            type: "boolean",
            description:
              "Show replies (optional). Should be 'true' or 'false'.",
          },
          {
            name: "searchTerm",
            in: "query",
            type: "string",
            description: "Filter by search (optional).",
          },
        ],
        responses: {
          "200": {
            description: "Comments retrieved successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/comments/get/{commentId}": {
      get: {
        summary: "Get a comment by ID",
        tags: ["Admin - Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "query",
            type: "boolean",
            description:
              "Show user details (optional). Should be 'true' or 'false'.",
          },
          {
            name: "product",
            in: "query",
            type: "boolean",
            description:
              "Show product details (optional). Should be 'true' or 'false'.",
          },
          {
            name: "reply",
            in: "query",
            type: "boolean",
            description:
              "Show replies (optional). Should be 'true' or 'false'.",
          },
        ],
        responses: {
          "200": {
            description: "Comment retrieved successfully",
          },
          "422": {
            description: "Invalid request",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/comments/update": {
      put: {
        summary: "Update a comment",
        tags: ["Admin - Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "commentId",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                commentId: {
                  type: "string",
                  description: "The ID of comment.",
                },
                comment: {
                  type: "string",
                  description: "The text of comment (optional).",
                },
                role: {
                  type: "string",
                  description:
                    "The role of comment. It must be 'comment' or 'reply' (optional).",
                },
                replyId: {
                  type: "string",
                  description:
                    "This field confirms witch comment is a reply. (optional).",
                },
                userId: {
                  type: "string",
                  description: "The ID of user. (optional)",
                },
                productId: {
                  type: "string",
                  description: "The ID of product. (optional)",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Comment updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/comments/delete/{commentId}": {
      delete: {
        summary: "Delete a comment",
        tags: ["Admin - Comments"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "commentId",
            in: "path",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "Comment deleted successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/inventories/create": {
      post: {
        summary: "Create a new inventory",
        tags: ["Admin - Inventories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID (optional)",
                  },
                  colorId: {
                    type: "string",
                    description: "Color ID (optional)",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of the inventory",
                  },
                },
                required: ["productId", "colorId", "quantity"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Successfully created an inventory",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Not found",
          },
          "409": {
            description:
              "Conflict, inventory with the same specification already exists",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/inventories/get": {
      get: {
        summary: "Get inventories based on optional query parameters",
        tags: ["Admin - Inventories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "colorId",
            schema: {
              type: "string",
            },
            description: "Filter by Color ID",
          },
          {
            in: "query",
            name: "productId",
            schema: {
              type: "string",
            },
            description: "Filter by Product ID",
          },
        ],
        responses: {
          "200": {
            description: "Successfully retrieved inventories",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/inventories/update": {
      put: {
        summary: "Update an existing inventory",
        tags: ["Admin - Inventories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  inventoryId: {
                    type: "string",
                    description: "Inventory ID",
                  },
                  productId: {
                    type: "string",
                    description: "Product ID (optional)",
                  },
                  colorId: {
                    type: "string",
                    description: "Color ID (optional)",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of the inventory (optional)",
                  },
                },
                required: ["inventoryId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully updated an inventory",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/inventories/delete/{inventoryId}": {
      delete: {
        summary: "Delete an existing inventory",
        tags: ["Admin - Inventories"],
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "inventoryId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Inventory ID",
          },
        ],
        responses: {
          "200": {
            description: "Successfully deleted an inventory",
          },
          "404": {
            description: "Not found",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/inventories/add": {
      post: {
        tags: ["Admin - Likes"],
        summary: "Add product to likes.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  colorId: {
                    type: "string",
                    description: "Color ID",
                  },
                },
                required: ["inventoryId"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Inventory created successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/likes/get": {
      get: {
        tags: ["Admin - Likes"],
        summary: "Get all likes.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "query",
            type: "string",
            description:
              "Include user info. Should be true or false. (optional)",
          },
          {
            name: "product",
            in: "query",
            type: "string",
            description:
              "Include product info. Should be true or false. (optional)",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/InventoryType" },
            },
          },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/likes/get/{likeId}": {
      get: {
        tags: ["Admin - Likes"],
        summary: "Get like item by id.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "query",
            type: "string",
            description:
              "Include user info. Should be true or false. (optional)",
          },
          {
            name: "product",
            in: "query",
            type: "string",
            description:
              "Include product info. Should be true or false. (optional)",
          },
          {
            in: "path",
            name: "likeId",
            schema: {
              type: "string",
            },
            required: true,
            description: "like ID",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/InventoryType" },
            },
          },
          "404": {
            description: "Not Found",
          },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/likes/update": {
      put: {
        tags: ["Admin - Likes"],
        summary: "Update an existing liked item",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  likeId: {
                    type: "string",
                    description: "Like ID",
                  },
                  productId: {
                    type: "string",
                    description: "Product ID (optional)",
                  },
                  userId: {
                    type: "string",
                    description: "User ID (optional)",
                  },
                },
                required: ["likeId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Inventory updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/likes/delete/{inventoryId}": {
      delete: {
        tags: ["Admin - Likes"],
        summary: "Delete an like by ID",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "likeId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Inventory ID",
          },
        ],
        responses: {
          "200": { description: "Inventory deleted successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orderItems/create": {
      post: {
        tags: ["Admin - Order Items"],
        summary: "Create an order item",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orderId: {
                    type: "string",
                    description: "Order ID",
                  },
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of order item",
                  },
                },
                required: ["orderId", "productId", "quantity"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orderItems/get": {
      get: {
        tags: ["Admin - Order Items"],
        summary: "Get all order items.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "color",
            in: "query",
            type: "string",
            description:
              "Include color info. Should be true or false. (optional)",
          },
          {
            name: "product",
            in: "query",
            type: "string",
            description:
              "Include product info. Should be true or false. (optional)",
          },
          {
            name: "order",
            in: "query",
            type: "string",
            description:
              "Include order info. Should be true or false. (optional)",
          },
          {
            name: "order",
            in: "query",
            type: "string",
            description:
              "Include order info. Should be true or false. (optional)",
          },
          {
            name: "take",
            in: "query",
            type: "number",
          },
          {
            name: "skip",
            in: "query",
            type: "number",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/InventoryType" },
            },
          },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orderItems/get/{orderItemId}": {
      get: {
        tags: ["Admin - Order Items"],
        summary: "Get all order items.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "likeId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Inventory ID",
          },
        ],
        responses: {
          "200": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orderItems/update": {
      put: {
        tags: ["Admin - Order Items"],
        summary: "Update an existing order items",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orderItemId: {
                    type: "string",
                    description: "Order Item ID",
                  },
                  orderId: {
                    type: "string",
                    description: "Order ID (optional)",
                  },
                  productId: {
                    type: "string",
                    description: "Product ID (optional)",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of order item (optional)",
                  },
                },
                required: ["orderItemId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order item updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/orderItems/delete/{orderItemId}": {
      delete: {
        tags: ["Admin - Order Items"],
        summary: "Delete an order item by ID",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "likeId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Order Item ID",
          },
        ],
        responses: {
          "200": { description: "Inventory deleted successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orders/create": {
      post: {
        tags: ["Admin - Orders"],
        summary: "Create an order",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: {
                    type: "string",
                    description: "User ID",
                  },
                  totalPrice: {
                    type: "number",
                    description: "Totlal price of order",
                  },
                  status: {
                    type: "string",
                    description: "The status of order",
                  },
                },
                required: ["userId", "totalPrice", "status"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Success" },
          "404": { description: "Not Found" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orders/get": {
      get: {
        tags: ["Admin - Orders"],
        summary: "Get all orders",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "date",
            in: "query",
            type: "string",
            description: "Filter by date",
          },
          {
            name: "status",
            in: "query",
            type: "string",
            description: "Filter by status",
          },
          {
            name: "totalSale",
            in: "query",
            type: "string",
            description:
              "Include total sales of all order. Should be true or false. (optional)",
          },
          {
            name: "orderItems",
            in: "query",
            type: "string",
            description:
              "Include order Items info. Should be true or false. (optional)",
          },
          {
            name: "user",
            in: "query",
            type: "string",
            description:
              "Include user info. Should be true or false. (optional)",
          },
          {
            name: "color",
            in: "query",
            type: "string",
            description:
              "Include color info. Should be true or false. (optional)",
          },
          {
            name: "payment",
            in: "query",
            type: "string",
            description:
              "Include payment info. Should be true or false. (optional)",
          },
          {
            name: "take",
            in: "query",
            type: "number",
          },
          {
            name: "skip",
            in: "query",
            type: "number",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/InventoryType" },
            },
          },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orders/get/{orderItemId}": {
      get: {
        tags: ["Admin - Orders"],
        summary: "Get order by ID.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "orderId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Order ID",
          },
        ],
        responses: {
          "200": { description: "Success" },
          "404": { description: "Not Found" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/orders/update": {
      put: {
        tags: ["Admin - Orders"],
        summary: "Update an existing order",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orderId: {
                    type: "string",
                    description: "Order ID",
                  },
                  totalPrice: {
                    type: "number",
                    description: "Totlal price of order",
                  },
                  status: {
                    type: "string",
                    description: "The status of order",
                  },
                },
                required: ["totalPrice", "status"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order item updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/orders/delete/{orderItemId}": {
      delete: {
        tags: ["Admin - Orders"],
        summary: "Delete an order by ID",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "orderId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Order ID",
          },
        ],
        responses: {
          "200": { description: "Order deleted successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/payments/create": {
      post: {
        tags: ["Admin - Payments"],
        summary: "Create a payment",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  authorityId: {
                    type: "string",
                    description: "Authority ID of payment",
                  },
                  status: {
                    type: "number",
                    description: "Status of payment",
                  },
                  amount: {
                    type: "string",
                    description: "The amount of payment",
                  },
                  orderId: {
                    type: "string",
                    description: "Order ID",
                  },
                },
                required: ["authorityId", "status", "amount", "orderId"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/payments/get": {
      get: {
        tags: ["Admin - Payments"],
        summary: "Get all payments",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/payments/get/{paymentId}": {
      get: {
        tags: ["Admin - Payments"],
        summary: "Get payment by ID.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "paymentId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Payment ID",
          },
        ],
        responses: {
          "200": { description: "Success" },
          "404": { description: "Not Found" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/payments/update": {
      put: {
        tags: ["Admin - Payments"],
        summary: "Update an existing order",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  paymentId: {
                    type: "string",
                    description: "Payment ID",
                  },
                  authorityId: {
                    type: "string",
                    description: "Authority ID of payment",
                  },
                  status: {
                    type: "number",
                    description: "Status of payment",
                  },
                  amount: {
                    type: "string",
                    description: "The amount of payment",
                  },
                  orderId: {
                    type: "string",
                    description: "Order ID",
                  },
                },
                required: ["paymentId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order item updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/payments/delete/{paymentId}": {
      delete: {
        tags: ["Admin - Payments"],
        summary: "Delete an payment by ID",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "orderId",
            schema: {
              type: "string",
            },
            required: true,
            description: "Order ID",
          },
        ],
        responses: {
          "200": { description: "Order deleted successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/products/create": {
      post: {
        tags: ["Admin - Products"],
        summary: "Create a product",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Title of product",
                  },
                  price: {
                    type: "number",
                    description: "Price of product",
                  },
                  discountStatus: {
                    type: "string",
                    description: "Discount Status",
                  },
                  discountPercent: {
                    type: "number",
                    description: "Discount Percent",
                  },
                  discountEndTime: {
                    type: "string",
                    format: "date",
                    description: "Discount End Time",
                  },
                  categoryId: {
                    type: "string",
                    description: "Category ID",
                  },
                },
                required: ["title", "price", "discountStatus", "categoryId"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/products/update": {
      put: {
        tags: ["Admin - Products"],
        summary: "Update an existing product",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  title: {
                    type: "string",
                    description: "Title of product",
                  },
                  price: {
                    type: "number",
                    description: "Price of product",
                  },
                  discountStatus: {
                    type: "string",
                    description: "Discount Status",
                  },
                  discountPercent: {
                    type: "number",
                    description: "Discount Percent",
                  },
                  discountEndTime: {
                    type: "string",
                    format: "date",
                    description: "Discount End Time",
                  },
                  categoryId: {
                    type: "string",
                    description: "Category ID",
                  },
                },
                required: ["productId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order item updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/products/upload-image": {
      post: {
        tags: ["Admin - Products"],
        summary: "Upload product image",
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "productId",
            in: "formData",
            required: true,
            type: "string",
            description: "Product ID",
          },
          {
            name: "image",
            in: "formData",
            required: true,
            type: "file",
            description: "Image file to upload",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "404": {
            description: "Not Found",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/images/delete/{imageId}": {
      delete: {
        tags: ["Admin - Products"],
        summary: "Delete an image by ID",
        parameters: [
          {
            name: "imageId",
            in: "path",
            required: true,
            type: "string",
            description: "Image ID",
          },
        ],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/admin/users/create": {
      post: {
        tags: ["Admin - Users"],
        summary: "Create a user",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                    description: "First Name",
                  },
                  lastName: {
                    type: "string",
                    description: "Last Name",
                  },
                  phone: {
                    type: "string",
                    description: "Phone Number",
                  },
                  email: {
                    type: "string",
                    description: "Email Address",
                  },
                  image: {
                    type: "string",
                    description: "Image URL",
                  },
                  password: {
                    type: "string",
                    description: "Password",
                  },
                },
                required: [
                  "firstName",
                  "lastName",
                  "phone",
                  "email",
                  "password",
                ],
              },
            },
          },
        },
        responses: {
          "201": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/upload-image": {
      post: {
        summary: "Upload user image",
        tags: ["Admin - Users"],
        parameters: [
          {
            name: "userId",
            in: "body",
            required: true,
            type: "string",
            description: "User ID",
          },
          {
            name: "image",
            in: "formData",
            required: true,
            type: "file",
            description: "Image file",
          },
        ],
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        responses: {
          "200": {
            description: "Success",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "404": {
            description: "Not Found",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
                response: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/admin/users/get": {
      get: {
        tags: ["Admin - Users"],
        summary: "Get all users",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "searchTerm",
            in: "query",
            type: "string",
            description:
              "Search by first name, last name, email, phone amd userId.",
          },
          {
            name: "orderBy",
            in: "query",
            type: "string",
            description: "Should be 'firstName' and 'lastName'.",
          },
        ],
        responses: {
          "200": { description: "Success" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/users/get/{productId}": {
      get: {
        tags: ["Admin - Users"],
        summary: "Get user by ID.",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "userId",
            schema: {
              type: "string",
            },
            required: true,
            description: "User ID",
          },
        ],
        responses: {
          "200": { description: "Success" },
          "404": { description: "Not Found" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
    "/admin/users/update": {
      put: {
        tags: ["Admin - Users"],
        summary: "Update an existing user",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: {
                    type: "string",
                    description: "UserId",
                  },
                  firstName: {
                    type: "string",
                    description: "First Name",
                  },
                  lastName: {
                    type: "string",
                    description: "Last Name",
                  },
                  phone: {
                    type: "string",
                    description: "Phone Number",
                  },
                  email: {
                    type: "string",
                    description: "Email Address",
                  },
                  image: {
                    type: "string",
                    description: "Image URL",
                  },
                  password: {
                    type: "string",
                    description: "Password",
                  },
                },
                required: ["userId"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated successfully",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/admin/users/delete/{userId}": {
      delete: {
        tags: ["Admin - Users"],
        summary: "Delete an user by ID",
        parameters: [
          {
            name: "token",
            in: "header",
            description: "Authentication token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "userId",
            schema: {
              type: "string",
            },
            required: true,
            description: "User ID",
          },
        ],
        responses: {
          "200": { description: "User deleted successfully" },
          "500": { description: "Internal Server Error" },
        },
      },
    },
  },
};
