import React, { useEffect, useState } from "react";

const DynamicImage = ({ value, maxValue }) => {
  const [percentage, setPercentage] = useState(0);

  // Update the percentage whenever `value` or `maxValue` changes
  useEffect(() => {
    const calculatedPercentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
    setPercentage(calculatedPercentage);
  }, [value, maxValue]);

  const getImageSource = (percentage) => {
    if (percentage <= 100) {
      return "../../assets/flower.png"; // 100% or more
    } else if (percentage <= 80) {
      return "../../assets/leaf.png"; // 80% to 99%
    } else if (percentage <= 50) {
      return "../../assets/dyingleft1.png"; // 50% to 79%
    } else if (percentage = 20) {
      return "../../assets/dyingleef.png"; // 20% to 49%
    } else {
      return "../../assets/dead.png"; // Below 20%
    }
  };

  const imageSource = getImageSource(percentage);

  return (
    <div className="text-center">
      <img
        src={imageSource}
        alt="Dynamic Plant State"
        className="mx-auto mb-4"
        style={{ width: "150px", height: "300px" }} // Fixed image size
      />
      <p>Current Budget Usage: {percentage.toFixed(2)}%</p>
    </div>
  );
};

export default DynamicImage;
