import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from '../components/Slider';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-700 to-purple-500">
    <div class="flex flex-col justify-center items-center w-2/3 p-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-xl">
  <img src="/home.png" alt="Logo" class="h-20 w-20 mb-4 shadow-md" />
  <h1 class="text-3xl font-extrabold text-white mb-4">Welcome to MarketLink!</h1>
  <p class="text-lg text-gray-300 mb-2 font-semibold">About:</p>
  <p class=" text-gray-200 mb-6">
    This project is a full-stack e-commerce web application that focuses on providing users with the ability to:
  </p>
  <ul class="list-disc text-gray-300 self-start ml-14 mb-8">
    <li>Browse products</li>
    <li>Manage the cart</li>
    <li>Proceed to payment</li>
    <li>Message other users</li>
    <li>List products</li>
    <li>Post comments</li>
    <li>Edit everything above</li>
  </ul>
</div>
    <div className="w-1/2 pt-14">
    <p className ="text-center font-bold text-white text-2xl pb-10 ">New arrivals</p>
      <Slider />
    </div>
  </div>
  );
};

export default HomePage;

