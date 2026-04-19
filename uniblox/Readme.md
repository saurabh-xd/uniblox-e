# E-commerce Backend (Cart & Checkout System)

This project is a simple e-commerce backend system where users can add items to a cart and place orders with a discount system.

---

## Features

- Add items to cart
- View cart
- Checkout and place order
- Apply discount codes
- Automatic discount generation on every Nth order
- Admin APIs for:
  - Generating discount codes
  - Viewing system statistics
- Unit tests for core business logic

---

## Tech Stack

- Node.js
- Express.js
- Jest (for testing)

---

## Installation & Setup

1. Clone the repository

```bash
git clone <https://github.com/saurabh-xd/uniblox-e>
cd <uniblox>
```

2. Install dependencies

```bash
npm install
```

3. Run the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## Run Tests

```bash
npm test
```

---

## API Endpoints

### Cart

#### Add Item to Cart

- **Method:** `POST`
- **Endpoint:** `/api/cart/add`
- **Body:**

```json
{
  "id": "1",
  "name": "Shirt",
  "price": 100,
  "quantity": 2
}
```

#### Get Cart

- **Method:** `GET`
- **Endpoint:** `/api/cart`

---

### Checkout

#### Place Order

- **Method:** `POST`
- **Endpoint:** `/api/checkout`
- **Body:**

```json
{
  "discountCode": "SAVE10"
}
```

---

### Admin APIs

#### Generate Discount

- **Method:** `POST`
- **Endpoint:** `/api/admin/generate-discount`
- **Body:**

```json
{
  "percentage": 20
}
```

#### Get Stats

- **Method:** `GET`
- **Endpoint:** `/api/admin/stats`

---

## Discount System

- Every Nth order generates a discount code
- Discount codes can be applied during checkout
- Each discount code can be used only once

---

## Project Structure

```
src/
├── controllers/
├── services/
├── routes/
├── store/
└── tests/
```

---

## Testing

Unit tests are written using Jest for:

- Cart logic
- Checkout logic
- Discount validation


## Postman Collection

A Postman collection is included for easy API testing.

Import `postman_collection.json` into Postman.
