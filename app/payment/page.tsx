'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingCart, ArrowLeft, Shield, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
}

interface PaymentData {
  action: string;
  method: string;
  fields: {
    merchant_id: string;
    merchant_key: string;
    m_payment_id: string;
    amount: string;
    item_name: string;
    item_description: string;
    signature: string;
  };
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<Product | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchPaymentData = async () => {
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiHost}/pay/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }
        
        const paymentResponse = await response.json();
        setPaymentData(paymentResponse);
        
        // Extract product info from payment data
        const productInfo: Product = {
          productId: productId,
          name: paymentResponse.fields.item_name,
          description: paymentResponse.fields.item_description,
          price: parseFloat(paymentResponse.fields.amount)
        };
        
        setProduct(productInfo);
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [productId]);

  const handlePayment = () => {
    if (paymentData && !processingPayment) {
      setProcessingPayment(true);
      // Submit the form programmatically
      const form = document.getElementById('payfast-form') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CreditCard className="h-8 w-8 text-blue-600" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-red-50 border border-red-200 p-8">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Products
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!product || !paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-red-50 border border-red-200 p-8">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Product Not Found</h2>
            <p className="text-red-600 mb-4">The requested product could not be found.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Products
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:mt-[10rem]">
          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div style={{backgroundColor: '#026bb3'}} className="p-3 mr-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Summary</h1>
                <p className="text-gray-600">Review your purchase</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="text-lg font-medium text-gray-900">Total Amount</span>
                <span className="text-3xl font-bold text-gray-900 font-mono tracking-tight">R{product.price.toFixed(2)}</span>
              </div>

              <div className="mt-6 p-4 bg-green-50">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">Secure Payment with PayFast</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div style={{backgroundColor: '#e5445f'}} className="p-3 mr-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <p className="text-gray-600">Complete your purchase</p>
              </div>
            </div>

            {/* Payment Information Display */}
            <div className="mb-6 p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-gray-900">{paymentData.fields.m_payment_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900 font-mono">R{paymentData.fields.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant ID:</span>
                  <span className="font-mono text-gray-900">{paymentData.fields.merchant_id}</span>
                </div>
              </div>
            </div>

            {/* PayFast Form */}
            <form 
              id="payfast-form"
              action={paymentData.action} 
              method={paymentData.method}
              target="_blank"
            >
              {/* Hidden form fields */}
              {Object.entries(paymentData.fields).map(([key, value]) => (
                <input 
                  key={key}
                  type="hidden" 
                  name={key} 
                  value={value}
                />
              ))}
            </form>

            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: processingPayment ? 1 : 1.02 }}
              whileTap={{ scale: processingPayment ? 1 : 0.98 }}
              onClick={handlePayment}
              disabled={processingPayment}
              style={{backgroundColor: '#026bb3'}}
              className={`w-full text-white font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                processingPayment 
                  ? 'opacity-80 cursor-not-allowed' 
                  : 'hover:opacity-90 hover:shadow-xl'
              }`}
            >
              {processingPayment ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Pay <span className="font-mono">R{product.price.toFixed(2)}</span> with PayFast</span>
                </>
              )}
            </motion.button>

            {/* Security Notice */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              This payment will be processed securely by PayFast
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
