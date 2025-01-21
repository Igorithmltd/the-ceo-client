import React, { useState } from 'react';
import { CiCamera } from "react-icons/ci";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Avatar preview */}
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center">
            <span className="text-white bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center"><CiCamera/></span>
            
          </div>
        )}
        {/* Upload button */}
        <label
          htmlFor="avatarInput"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
        >
        </label>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      {/* Reset button */}
      <button
        onClick={() => setAvatar(null)}
        className="px-4 py-2 bg-transparent text-gray-400 rounded hover:bg-transparent"
      >
        Add a profile picture
      </button>
    </div>
  );
};

export default AvatarUpload;
