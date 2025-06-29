import React, { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import cellphone from "../../../../assets/iconsimage/cellphone.png";
import computer from "../../../../assets/iconsimage/computer.png";
import gamepad from "../../../../assets/iconsimage/gamepad.png";
import headphone from "../../../../assets/iconsimage/headphone.png";
import smartwatch from "../../../../assets/iconsimage/smartwacth.png";
import camera from "../../../../assets/iconsimage/camera.png";

// Corrected icons array with image values
const categories = [
  { name: "Phones", icon: cellphone },
  { name: "Computers", icon: computer },
  { name: "SmartWatch", icon: smartwatch },
  { name: "Camera", icon: camera },
  { name: "HeadPhones", icon: headphone },
  { name: "Gaming", icon: gamepad },
];

const CategoryGrid = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[1170px] mx-auto my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 relative">
          {/* Title */}
          <div className="absolute left-0 top-[-10px] transform -translate-y-1/2 z-10">
            <h2 className="md:text-3xl">
              <span className="text-black">Browse By Category</span>
            </h2>
          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            className="absolute right-14 top-[-18px] transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronLeft className="text-black" />
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar mt-10 space-x-6 "
            style={{ scrollSnapType: "x mandatory" }}
          >
            {/* {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 hover:bg-amber-800   w-[140px] md:w-[163px] h-[130px] md:h-[140px] border border-gray-400 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition duration-300"
                style={{ scrollSnapAlign: "start" ,color:"white"}}
              >
                <div className="text-gray-600">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="mt-4 text-sm font-medium text-gray-700">
                  {cat.name}
                </span>
              </div>
            ))} */}
            {categories.map((cat, idx) => (
  <div
    key={idx}
    className="group flex-shrink-0 w-[140px] md:w-[163px] h-[130px] md:h-[140px] border border-gray-400 rounded-lg flex flex-col items-center justify-center hover:bg-red-500 hover:shadow-md transition duration-300"
    style={{ scrollSnapAlign: "start" }}
  >
    <div>
      <img
        src={cat.icon}
        alt={cat.name}
        className="w-12 h-12 object-contain group-hover:filter group-hover:invert"
      />
    </div>
    <span className="mt-4 text-sm font-medium group-hover:text-white text-gray-700">
      {cat.name}
    </span>
  </div>
))}

          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll categories right"
            className="absolute right-3 top-[-18px] transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronRight className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
