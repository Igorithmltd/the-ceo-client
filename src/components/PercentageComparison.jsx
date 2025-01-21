import React from 'react';

const PercentageComparison = ({ item1Percentage, item2Percentage }) => {
  // Normalize the percentages to ensure both add up to 100% (in case they don’t)
  const totalPercentage = item1Percentage + item2Percentage;

  const item1Width = (item1Percentage / totalPercentage) * 100;
  const item2Width = (item2Percentage / totalPercentage) * 100;

  return (
    <div className='rounded-lg' style={{ display: 'flex', height: '20px', width: '100%', borderRadius:'20px' }}>
      {/* Red div for item1 */}
      <div
        style={{
          backgroundColor: 'red',
          width: `${item1Width}%`,
          transition: 'width 0.5s ease',
        }}
      ></div>
      
      {/* Green div for item2 */}
      <div
        style={{
          backgroundColor: 'green',
          width: `${item2Width}%`,
          transition: 'width 0.5s ease',
        }}
      ></div>
    </div>
  );
};

export default PercentageComparison;
