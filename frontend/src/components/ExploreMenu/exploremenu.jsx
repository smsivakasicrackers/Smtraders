import React from "react";
import { FaStar, FaGift } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Exploremenu = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Night Shots",
      color: "bg-orange-50",
      iconColor: "text-orange-500",
      icon: <FaStar className="text-3xl" />,
    },
    {
      name: "Day Shots",
      color: "bg-blue-50",
      iconColor: "text-blue-500",
      icon: <BsSunFill className="text-3xl" />,
    },
    {
      name: "Kids Crackers",
      color: "bg-green-50",
      iconColor: "text-green-500",
      icon: <LuSparkles className="text-3xl" />,
    },
    {
      name: "Gift Boxes",
      color: "bg-pink-50",
      iconColor: "text-pink-500",
      icon: <FaGift className="text-3xl" />,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Discover Our Sparkling Range
        </h2>
        <div className="w-24 h-[3px] bg-indigo-600 mx-auto mt-2 rounded-full"></div>
        <p className="mt-3 text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
          Explore our vibrant collection of Diwali Crackers, designed to light up
          your celebrations with dazzling displays and festive joy!
        </p>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/search/${item.name}`)}
              className={`${item.color} rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-sm ${item.iconColor}`}
              >
                {item.icon}
              </div>
              <p className="mt-4 text-gray-800 font-semibold text-base">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exploremenu;
