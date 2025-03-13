import { useState, useEffect } from "react";

const useLoader = (isLoading: boolean) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      const timeout = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return showLoader;
};

export default useLoader;
