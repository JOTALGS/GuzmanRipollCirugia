import { useEffect } from "react";

const ScrollLogger = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const scrollInVh = scrollY / vh;
      console.log(`Scrolled: ${scrollInVh.toFixed(2)} vh`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // This component just logs
};

export default ScrollLogger;
