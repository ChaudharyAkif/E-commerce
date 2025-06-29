import React from "react";

// Replace these with your actual image imports
import bag from "../../../assets/iconsimage/shop.png";
import money from "../../../assets/iconsimage/money.png";
import dollar from "../../../assets/iconsimage/dollar.jpg";
import shopping from "../../../assets/iconsimage/shopping.png";

const statsData = [
  {
    icon: bag,
    value: "10.5k",
    label: "Sellers active on our site",
  },
  {
    icon: money,
    value: "33k",
    label: "Monthly Product Sale",
  },
  {
    icon: dollar,
    value: "45.5k",
    label: "Customers active on our site",
  },
  {
    icon: shopping,
    value: "25k",
    label: "Annual gross sale in our site",
  },
];

const StatsGrid = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statsData.map((item, idx) => (
        <div
          key={idx}
          className={`group flex flex-col items-center justify-center rounded-lg border p-5 text-center shadow-sm transition-all duration-300 bg-white hover:bg-red-500 hover:text-white`}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="w-10 h-10 mb-3 transition duration-300 group-hover:invert group-hover:brightness-0"
          />
          <h3 className="text-xl font-bold">{item.value}</h3>
          <p className="text-sm mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
