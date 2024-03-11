import useMediaWidth from "@/hooks/useMediaWidth";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const ThreeDots = ({color}: {color: string}) => {
  const windowWidth = useWindowWidth();
  const lessThan_940_Screen = useMediaWidth(windowWidth <= 940);  

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${lessThan_940_Screen ? "24" : "32"}`} 
      height={`${lessThan_940_Screen ? "5" : "7"}`}
      viewBox="0 0 32 7"
      fill="none"
    >
      <circle
        cx="3.29754"
        cy="3.29754"
        r="3.29754"
        transform="matrix(1 0 0 -1 0 6.59521)"
        fill={color}
      />
      <circle
        cx="3.29754"
        cy="3.29754"
        r="3.29754"
        transform="matrix(1 0 0 -1 12.5732 6.59521)"
        fill={color}
      />
      <circle
        cx="3.29754"
        cy="3.29754"
        r="3.29754"
        transform="matrix(1 0 0 -1 25.1467 6.59521)"
        fill={color}
      />
    </svg>
  );
};

export default ThreeDots;
