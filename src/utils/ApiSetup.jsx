import axios from 'axios';

export const baseUrl = 'https://api.theceoapp.com/'

// export const clientUrl = 'http://localhost:5173/'
export const clientUrl = 'https://theceoapp.onrender.com/'
const ApiSetup = () => {
  // const baseUrl = "http://localhost:5000/api/";
  const baseUrl = "https://api.theceoapp.com/api/"
  // const token = localStorage.getItem("token");

  const fetcherApi = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });

  const fetcherFormApi = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
  });

  return {
    get: (endpoint, params) => fetcherApi.get(endpoint, { params }),
    post: (endpoint, data) => fetcherApi.post(endpoint, data),
    put: (endpoint, data) => fetcherApi.put(endpoint, data),
    putFormData: (endpoint, data) => fetcherFormApi.put(endpoint, data),
    postFormData: (endpoint, data) => fetcherFormApi.post(endpoint, data),
    delete: (endpoint) => fetcherApi.delete(endpoint)
  };
};

export function generateFourDigitNumber() {
  // Generate a random number between 1000 and 9999
  const number = Math.floor(Math.random() * 9000) + 1000;
  return number;
}

export function parseCustomDate(customDate){
  const day = customDate.substring(0, 2);     // "09"
  const month = customDate.substring(2, 4);   // "19"
  const year = customDate.substring(4, 6);    // "24"
  const hour = customDate.substring(6, 8);    // "08"
  const minute = customDate.substring(8, 10); // "16"
  const second = customDate.substring(10, 12); // "59"

  // Creating a formatted date string: "20YY-MM-DD HH:mm:ss"
  const formattedDate = `20${year}-${month}-${day}T${hour}:${minute}:${second}`;
  
  return new Date(formattedDate);
};

export function formatCustomDate(dateString) {
  // Extract date components from the input string
  const month = parseInt(dateString.substring(0, 2), 10); // MM
  const day = parseInt(dateString.substring(2, 4), 10); // DD
  let year = parseInt(dateString.substring(4, 8), 10); // YYYY
  
  // Fix the year issue - it seems the year was incorrectly interpreted as '2408' instead of '2024'
  if (year > 2100) {
    year = 2000 + (year % 100);  // Correct year to be in the 2000s, e.g., '2408' -> '2024'
  }

  const hours = parseInt(dateString.substring(8, 10), 10); // HH
  const minutes = parseInt(dateString.substring(10, 12), 10); // MM
  
  // Determine the day suffix
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return `${day}th`; // Special case for 11th-13th
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  // Get the day suffix (e.g., "1st", "2nd", etc.)
  const daySuffix = getDaySuffix(day);

  // Convert to 12-hour format and determine AM/PM
  const isPM = hours >= 12;
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  const formattedHours = hours12 < 10 ? `0${hours12}` : hours12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = isPM ? 'PM' : 'AM';

  // Format the month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[month - 1];

  // Return the formatted string in the desired format
  return `${daySuffix} ${monthName}, ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function getDurationFromNow(dateString) {
  // Parse the date string
  const day = dateString.substring(0, 2);     // "13"
  const month = dateString.substring(2, 4);   // "11"
  const year = dateString.substring(4, 8);     // "2024"
  const hour = dateString.substring(8, 10);    // "06"
  const minute = dateString.substring(10, 12); // "46"
  const second = dateString.substring(12, 14); // "50"

  // Create a Date object
  const eventDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

  // Get the current date
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now - eventDate;

  // Check if the event date is in the future
  if (diffInMs < 0) {
      return "In the future"; // You can handle future dates as needed
  }

  // Convert the difference to hours and minutes
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  // Check for duration greater than 48 hours
  if (hours >= 48) {
      const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return `${monthNames[month - 1]} ${day}`;
  }

  // Check for duration greater than 24 hours
  if (hours >= 24) {
      return "yesterday";
  }

  // Construct the output string for durations less than 24 hours
  let durationString = '';
  if (hours > 0) {
      durationString += `${hours} hrs `;
  }
  if (minutes > 0) {
      durationString += `${minutes} mins `;
  }
  durationString += 'ago';

  return durationString.trim();
}

export function roundToTwoDecimals(num) {
  return Number(num.toFixed(2));
}



// Example usage
// const dateString = "13112024064650";
// console.log(getDurationFromNow(dateString));

export default ApiSetup;
