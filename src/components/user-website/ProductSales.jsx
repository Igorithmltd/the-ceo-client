import React, { useState } from "react";
import ImageSlide from "../image/ImageSlide";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductSales = ({ item, addProductToCart, selectedCategory }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity <= 0) return;
    setQuantity((quantity) => quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleNavigateToDetail = (item) => {
    navigate(`/user/product/${item.id}`, { state: { item } });
  };

  return (
    <div
      key={item.id}
      className="md:max-w-[548px] md:max-h-[300px] flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <div className="flex">
        <div className="flex flex-col w-[33%] gap-4">
          <ImageSlide images={item.extraurls} />

          <div className="self-center flex md:hidden items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="border text-xs font-extrabold border-[#45598D] rounded-full pb-1 text-[#45598D] size-[18px]"
            >
              -
            </button>
            <span className="text-[17px] font-light">{quantity || 1}</span>
            <button
              onClick={handleIncrease}
              className=" border text-xs font-extrabold  border-[#45598D] rounded-full text-[#45598D] size-[18px]"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 p-4 w-2/3">
          <div>
            <h3 className="text-[13px] mdtext-[18px] font-bold mb-1 cursor-pointer">{item.name}</h3>
            <p className="text-[13px] mdtext-[18px] font-normal">
              {selectedCategory === "Services"
                ? `Starting from #${item.price}`
                : `#${item.unitsellingprice}`}
            </p>
          </div>
          <p className="text-gray-600 text-[13px] mb-4 line-clamp-2">{item.description}</p>

          {/* Unit Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="border text-xs font-extrabold border-[#45598D] rounded-full pb-1 text-[#45598D] size-[18px]"
            >
              -
            </button>
            <span className="text-[17px] font-light">{quantity || 1}</span>
            <button
              onClick={handleIncrease}
              className=" border text-xs font-extrabold  border-[#45598D] rounded-full text-[#45598D] size-[18px]"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Second Row - Add to Cart and View Buttons */}
      <div className="flex justify-between gap-4 mt-4 w-[100%] mx-auto">
        <button
          onClick={() => addProductToCart({ ...item, quantity, type: "product" })}
          className="w-1/2 rounded-[4px] border-red border  py-4 text-[12px] lg:text-[14px] font-bold text-red shadow-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleNavigateToDetail(item)}
          className="w-1/2 rounded-[4px] border-red border  py-4 text-[12px] lg:text-[14px] font-bold text-red shadow-sm"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductSales;
