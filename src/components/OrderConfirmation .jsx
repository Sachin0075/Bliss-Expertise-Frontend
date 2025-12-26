import React from 'react';

const OrderConfirmation = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg text-center">
                <div className="text-green-500 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. We will notify you once your order is on the way. Thank you
                    for shopping with us!
                </p>
                <button
                    onClick={() => window.location.href = '/sales'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
