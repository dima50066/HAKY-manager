import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loader: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch("/box.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
      }
    };
    fetchAnimationData();
  }, []);

  if (!animationData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const styles = {
    height: 200,
    width: 200,
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie
        animationData={animationData}
        style={styles}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default Loader;
