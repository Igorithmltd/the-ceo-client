export function convertObjToArray(obj) {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (obj) {
    const array = Object.entries(obj).map(([row, col]) => ({
      row: row,
      col: col,
    }));

    // Sort the array based on the month order
    let arrayResult = array.sort((a, b) => {
      return monthOrder.indexOf(a.row) - monthOrder.indexOf(b.row);
    });
     
    arrayResult = arrayResult.map(arr=>{
      return arr.col
    })
    return arrayResult
  } else {
    return [];
  }
}

export function convertObjToArrayInDays(obj) {

  if (obj) {
    const array = Object.entries(obj).map(([row, col]) => ({
      row: row,
      col: col,
    }));
    return array
  } else {
    return [];
  }
}

export function convertObjToArrayKey(obj) {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (obj) {
    const array = Object.entries(obj).map(([row, col]) => ({
      row: row,
      col: col,
    }));
    console.log(array)

    // Sort the array based on the month order
    let arrayResult = array.sort((a, b) => {
      return monthOrder.indexOf(a.row) - monthOrder.indexOf(b.row);
    });
     
    arrayResult = arrayResult.map(arr=>{
      return arr.col
    })
  } else {
    return [];
  }
}

// add the function to the util/helpers and use it

export function extractValues(obj) {
  // Check if the input is an object
  if (typeof obj === 'object' && obj !== null) {
    // Use Object.values to extract the values from the object
    // Define the order of the months
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sort the keys based on the defined month order
  const sortedKeys = monthOrder.filter(month => month in obj);

  // Extract the values in the sorted order
  const orderedValues = sortedKeys.map(month => obj[month]);

  return orderedValues;
  } else {
    return []; // Return an empty array if the input is not a valid object
  }
}