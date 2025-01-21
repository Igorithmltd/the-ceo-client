import React, { useEffect, useState } from "react";
import SearchInput2 from "./SearchInput2";
import { baseUrl } from "../utils/ApiSetup";
import ImageSlide from "./image/ImageSlide";
import ServiceSales from "./user-website/ServiceSales";
import ProductSales from "./user-website/ProductSales";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";

const UserServicesComponent = ({
  companyDetails,
  companyProducts,
  companyServices,
  companyName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Products");
  const { setCart } = useCart();

  const categories = [
    { id: 1, name: "Products" },
    { id: 2, name: "Services" },
    { id: 3, name: "About Us" },
  ];

  const images = [
    "https://ew.com/thmb/ziNyxjjYnInfphYg5ciPob6--IE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/f2227cfd-e70e-4c4d-9233-af3944a84d31-2000-9a2c69afe2004b6b9094074acea4ec70.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMqFAjs16Wr56MvaANnzzOW0j6kWE9GK1xFEWWtn87Fhiby77AsltatMepSzdIC8suODs&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQsyXstYTXJf9e6mqyIegRdf85-4o1qqf2A&s",
  ];

  const addItemToCart = async (payload) => {
    try {
      let items = JSON.parse(localStorage.getItem("ceo-user-shop")) || [];
      const existingItemIndex = items.findIndex(
        (item) => item.type == payload.type && item.name == payload.name
      );
      if (existingItemIndex !== -1) {
        items[existingItemIndex].quantity += payload.quantity;
        toast.success("Item updated to cart");
      } else {
        items.push(payload);
        toast.success("Item added to cart");
      }
      setCart(items);
      localStorage.setItem("ceo-user-shop", JSON.stringify(items));
    } catch (error) {}
  };

  return (
    <div className="p-6 font-Archivo container mx-auto">
      {/* Categories */}
      <div className="flex justify-between">
        <div className="flex space-x-2 lg:space-x-6 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 pb-4 font-medium text-[17px] lg:text-[23px]
                ${
                  selectedCategory === category.name
                    ? "text-red border-b-4 border-red"
                    : "text-gray-400"
                } 
                `}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="hidden md:block md:w-2/5">
          <SearchInput2 />
        </div>
      </div>

      {/* Conditional Rendering for Card Items or About Us */}
      {selectedCategory === "About Us" ? (
        <div className="p-4">
          <h2 className="text-[15px] lg:text-[20px] font-bold mb-4">About {companyName}</h2>
          <p className="text-[14px] lg:text-[16px] text-grey-20 mb-12">{companyDetails?.about}</p>
          <h2 className="text-[15px] lg:text-[20px] font-bold mb-4">Our Terms and Conditions</h2>
          <p className="text-[14px] lg:text-[16px] text-grey-20 mb-12">
            {companyDetails?.termsandcondition}
          </p>
        </div>
      ) : selectedCategory === "Products" ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-16">
          {selectedCategory &&
            companyProducts &&
            companyProducts?.map((item) => (
              <ProductSales
                key={item.id}
                addProductToCart={addItemToCart}
                item={item}
                selectedCategory={selectedCategory}
              />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-16">
          {selectedCategory &&
            companyServices &&
            companyServices?.map((item) => (
              <ServiceSales
                key={item.id}
                item={item}
                addServiceToCart={addItemToCart}
                selectedCategory={selectedCategory}
              />
            ))}
        </div>
      )}

      {/* Message when no category is selected */}
      {!selectedCategory && (
        <p className="text-center text-gray-500">Select a category to display cards</p>
      )}
    </div>
  );
};

export default UserServicesComponent;
