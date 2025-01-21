import { FaTrash } from "react-icons/fa";
import { baseUrl } from "../../utils/ApiSetup";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item, handleNavigateToDetail, handleDelete, handleMethod }) => {
  const { cart, setCart } = useCart();
  console.log({item})

  const handleIncrease = (payload) => {
    const itemIdx = cart.findIndex((c) => c.name === payload.name && c.type === payload.type);

    if (itemIdx > -1) {
      cart[itemIdx].quantity += 1;
      localStorage.setItem("ceo-user-shop", JSON.stringify(cart));
      setCart([...cart]);
    }
  };

  const handleDecrease = (payload) => {
    const itemIdx = cart.findIndex((c) => c.name === payload.name && c.type === payload.type);

    if (itemIdx > -1 && cart[itemIdx].quantity > 1) {
      cart[itemIdx].quantity -= 1; // Decrease the quantity
      localStorage.setItem("ceo-user-shop", JSON.stringify(cart));
      setCart([...cart]);
    }
  };

  return (
    <div className="md:max-w-[548px] md:max-h-[300px] flex p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Image */}
      <div className="flex flex-col w-[33%] gap-4">
        <img
          src={`${baseUrl}${item.url}`}
          alt={item.name}
          className=" aspect-square object-cover rounded-lg cursor-pointer"
          onClick={() => handleNavigateToDetail(item)}
        />
        <div className="self-center flex md:hidden items-center space-x-4">
          <button
            onClick={() => handleDecrease(item)}
            className="border text-xs font-extrabold border-[#45598D] rounded-full pb-1 text-[#45598D] size-[18px]"
          >
            -
          </button>
          <span className="text-[17px] font-light">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item)}
            className=" border text-xs font-extrabold  border-[#45598D] rounded-full text-[#45598D] size-[18px]"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between px-4 pt-4 w-2/3">
        <div>
          <h3
            className="text-[13px] mdtext-[18px] font-bold mb-1 cursor-pointer"
            onClick={() => handleNavigateToDetail(item)}
          >
            {item.name}
          </h3>
          <p className="text-gray-800 text-[13px] mdtext-[18px] font-normal">
            {item.type == "product" ? item.unitsellingprice : item.amount}
          </p>
        </div>
        <p className="text-gray-600 text-[13px] mb-4 line-clamp-2">{item.description}</p>

        {/* Unit Controls, Trash Icon, and Place Order */}
        <div className="flex items-center md:w-full  justify-between self-end">
          <div className="hidden md:flex items-center space-x-4 ">
            <button
              onClick={() => handleDecrease(item)}
              className="border text-xs font-extrabold border-[#45598D] rounded-full pb-1 text-[#45598D] size-[18px]"
            >
              -
            </button>
            <span className=" text-[17px] font-light leading-none">{item.quantity}</span>
            <button
              onClick={() => handleIncrease(item)}
              className=" border text-xs font-extrabold  border-[#45598D] rounded-full text-[#45598D] size-[18px]"
            >
              +
            </button>
          </div>

          {/* Trash Icon */}
          <div className="flex gap-6 justify-end">
            <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700">
              <FaTrash size={17} />
            </button>

            {/* Place Order Button */}
            <button
              onClick={handleMethod}
              className="border border-red text-red text-[12px] md:text-[14px] font-semibold px-4 py-3 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
