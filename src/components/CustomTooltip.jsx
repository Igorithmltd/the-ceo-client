import { useState } from "react";

function CustomTooltip({ children, text }) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent the default long-press behavior
    setTooltipVisible(true);
  };

  const handleTouchEnd = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {isTooltipVisible && (
        <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
            bg-white text-gray-700 text-xs rounded py-1 px-2 z-10"
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default CustomTooltip;