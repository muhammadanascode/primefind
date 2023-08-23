import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
