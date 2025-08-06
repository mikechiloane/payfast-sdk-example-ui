'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShoppingCart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiHost}/getProducts`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = (product: Product) => {
    // Navigate to payment page with product ID
    router.push(`/payment?productId=${product.productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-blue-600" />
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.svg"
              alt="Company Logo"
              width={200}
              height={80}
              priority
              className="h-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PayFast Java SDK Example
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            This is an example implementation of the PayFast Java SDK. The UI interacts with a Lambda function that uses the PayFast Java SDK to generate the PayFast form data.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Choose a product below and experience secure payment processing powered by PayFast's Java SDK integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div style={{backgroundColor: '#026bb3'}} className="p-3">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    ID: {product.productId}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900 font-mono tracking-tight">
                    R{product.price.toFixed(2)}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePayment(product)}
                    style={{backgroundColor: '#e5445f'}}
                    className="hover:opacity-90 text-white font-semibold py-3 px-6 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay Now
                  </motion.button>
                </div>
              </div>

              {/* Border animation */}
              <motion.div
                className="h-1"
                style={{backgroundColor: '#026bb3', originX: 0}}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && !loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Check back later for new products!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
