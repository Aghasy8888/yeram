import { useEffect, useState } from "react";
import { useWindowWidth } from "./useWindowWidth";


const useMediaWidth = (screenSizeBoolean: boolean) => {
    const windowWidth = useWindowWidth();
    const [shouldRender, setShouldRender] = useState(false);
  
    useEffect(() => {
      setShouldRender(screenSizeBoolean);
    }, [windowWidth, screenSizeBoolean]);

  return shouldRender;
}

export default useMediaWidth;