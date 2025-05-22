import { useEffect, useState } from "react";

export const useIntroCheck = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("jaedam-hasSeenIntro");

    if (!hasSeenIntro) {
      setShowIntro(true);
      localStorage.setItem("jaedam-hasSeenIntro", "true");
    } else {
      setShowIntro(false);
    }
  }, []);

  return showIntro;
};
