# E-Commerce Clothing Store Backend

This is the backend project for the E-Commerce Clothing Store. The project is built using Node.js, Express, and MongoDB. It provides APIs for managing products, users, orders, and more.

## Installation

1. Clone the repository:

git clone https://github.com/Sunthorn9rk/Clothing-Store-Backend.git


The project will be available at `http://localhost:5000`.

## Project Components

### Config

- **db.js**: Contains the configuration for connecting to MongoDB.

### Controllers

- **productController.js**: Handles product-related operations.
- **userController.js**: Handles user-related operations.
- **orderController.js**: Handles order-related operations.

### Middleware

- **authMiddleware.js**: Contains middleware for authentication and authorization.

### Models

- **Product.js**: Defines the schema for products.
- **User.js**: Defines the schema for users.
- **Order.js**: Defines the schema for orders.

### Routes

- **productRoutes.js**: Defines the routes for product-related operations.
- **userRoutes.js**: Defines the routes for user-related operations.
- **orderRoutes.js**: Defines the routes for order-related operations.

### Server

- **server.js**: The main entry point for the backend server. It sets up middleware, connects to the database, and loads routes dynamically.

## Deployment

To build the project for production, use the following command:



## API Endpoints

### Products

- `GET /api/products`: Get all products.
- `GET /api/products/:id`: Get a single product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product by ID.
- `DELETE /api/products/:id`: Delete a product by ID.

### Users

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user.
- `GET /api/users/profile`: Get the profile of the logged-in user.

### Orders

- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get a single order by ID.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
