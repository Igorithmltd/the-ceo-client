import React from 'react';
import { FaCamera } from 'react-icons/fa';

const ImageGrid = ({ images }) => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative w-full bg-gray-200 border border-gray-300 rounded-lg flex justify-center items-center"
                >
                    {image ? (
                        <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-600">
                            <p className="text-sm">No image available</p>
                        </div>
                    )}
                    <FaCamera
                        size={20}  // Reduced icon size
                        className="absolute top-2 right-2 text-gray-600"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;