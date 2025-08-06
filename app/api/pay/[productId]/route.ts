import { NextResponse } from 'next/server';

const paymentData: Record<string, any> = {
  "1": {
    "action": "https://sandbox.payfast.co.za/eng/process",
    "method": "POST",
    "fields": {
      "merchant_id": "10040898",
      "merchant_key": "pss0yex6jzaon",
      "m_payment_id": "RECCEDA1754502912751",
      "amount": "19.99",
      "item_name": "Product 1",
      "item_description": "Description for Product 1",
      "signature": "3ec72837ce704dbb1eb6c406f7984a1d"
    }
  },
  "2": {
    "action": "https://sandbox.payfast.co.za/eng/process",
    "method": "POST",
    "fields": {
      "merchant_id": "10040898",
      "merchant_key": "pss0yex6jzaon",
      "m_payment_id": "RECCEDA1754502912752",
      "amount": "29.99",
      "item_name": "Product 2",
      "item_description": "Description for Product 2",
      "signature": "3ec72837ce704dbb1eb6c406f7984a1d"
    }
  },
  "3": {
    "action": "https://sandbox.payfast.co.za/eng/process",
    "method": "POST",
    "fields": {
      "merchant_id": "10040898",
      "merchant_key": "pss0yex6jzaon",
      "m_payment_id": "RECCEDA1754502912753",
      "amount": "39.99",
      "item_name": "Product 3",
      "item_description": "Description for Product 3",
      "signature": "3ec72837ce704dbb1eb6c406f7984a1d"
    }
  }
};

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  
  const payment = paymentData[productId];
  
  if (!payment) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(payment);
}
