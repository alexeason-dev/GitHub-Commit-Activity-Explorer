import React from "react";
import { Clipboard } from "react-feather";

const HistoryCard = ({ isActive }) => {
  return (
    <>
      <div className={`${isActive ? "bg-white text-gray-800" : "hover:bg-[#16191c] text-white cursor-pointer"} group rounded-xl flex items-center h-10 my-1 mx-6 px-4 py-2 text-sm text-semibold flex justify-between items-center`}>
        <h1>Comparison - as/a, bsd/yolov5, rails/rub...</h1>
        <div className={`${!isActive ? "opacity-0 group-hover:opacity-100 hover:text-gray-800 hover:bg-white" : "hover:text-white hover:bg-gray-800"} rounded-full p-2 cursor-pointer`}>
          <Clipboard className="h-4 w-4" />
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
