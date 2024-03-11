import { RefObject, useEffect } from "react";

const useFocusRef = (inputRef: RefObject<HTMLInputElement>) => {
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [inputRef]);
}

export default useFocusRef;