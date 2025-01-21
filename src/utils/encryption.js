import CryptoJS from "crypto-js";
import { SECRET_ENCRYPTION_KEY } from "./constants";


// Function to encrypt the user data
function encryptData(data) {
  const dataString = JSON.stringify(data); // Convert data to a string
  const encryptedData = CryptoJS.AES.encrypt(dataString, SECRET_ENCRYPTION_KEY).toString();
  return encryptedData;
}

// Function to decrypt the data
function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_ENCRYPTION_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

function setToLocalStorage(key, data){
    data = typeof data == 'string' ? data : JSON.stringify(data)
    localStorage.setItem(key, data)
}

function generateRandomString(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
const maskedId = (id) =>{
  const view_id = generateRandomString(4) + id + generateRandomString(4);
  return view_id
}

function formatDate(input) {
  // Parse the input string: '091924081659'
  const year = '20' + input.slice(0, 2);    // '2024'
  const month = input.slice(2, 4);          // '09' (September)
  const day = input.slice(4, 6);            // '24' (24th)
  const hours = input.slice(6, 8);          // '08' (8 AM)
  const minutes = input.slice(8, 10);       // '16' (16 minutes)

  // Helper function to get the suffix for the day (1st, 2nd, 3rd, etc.)
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // for 11th to 19th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Create a Date object to handle time and date
  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);

  // Validate and format the month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthIndex = parseInt(month, 10) - 1;

  // Ensure the month is valid before trying to access the array
  const formattedMonth = monthNames[monthIndex] !== undefined ? monthNames[monthIndex] : "Invalid month";

  // Format the time in 12-hour format with AM/PM
  const formattedHours = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  // Format the day with the proper suffix
  const dayWithSuffix = parseInt(day, 10) + getDaySuffix(parseInt(day, 10));

  // Combine the final formatted date and time
  return `${dayWithSuffix} ${formattedMonth}, ${year} | ${formattedTime}`;
}



export {
    encryptData,
    decryptData,
    setToLocalStorage,
    maskedId,
    formatDate
}
