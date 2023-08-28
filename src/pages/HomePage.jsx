import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from '../components/Slider';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <div className="flex flex-col justify-center items-center w-2/3 p-12">
      <img src="/home.png" alt="Logo" className="h-24 w-24 mb-4" />
      <h1 className="text-4xl font-extrabold text-white mb-4">Welcome to MarketLink!</h1>
      <p className="text-lg text-white mb-2 font-bold">About:</p>
      <p className="text-white mb-4">
        This project is a full-stack e-commerce web application that focuses on providing users with the ability to:
      </p>
      <ul className="list-disc text-white w-48 self-start ml-7">
        <li>Browse products</li>
        <li>Manage the cart</li>
        <li>Proceed to payment</li>
        <li>Message other users</li>
        <li>List products</li>
        <li>Post comments</li>
        <li>Edit everything above</li>
      </ul>
    </div>
    <div className="w-1/2 pt-24">
      <Slider />
    </div>
  </div>
  );
};

export default HomePage;

