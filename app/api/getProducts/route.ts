import { NextResponse } from 'next/server';

const products = [
  {
    "productId": "1",
    "name": "Product 1", 
    "description": "Description for Product 1",
    "price": 19.99
  },
  {
    "productId": "2",
    "name": "Product 2",
    "description": "Description for Product 2", 
    "price": 29.99
  },
  {
    "productId": "3",
    "name": "Product 3",
    "description": "Description for Product 3",
    "price": 39.99
  }
];

export async function GET() {
  return NextResponse.json(products);
}
