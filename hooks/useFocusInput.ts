import { useEffect } from 'react';

const useFocusInput = (inputIndex?: number, cursorAtStart: boolean = false) => {
  let index = inputIndex;
  if (index === undefined) {
    index = 0;
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    
    if (!inputs[index as number]) return;

    if (index !== undefined) {
      inputs[index as number].focus();
      if (cursorAtStart) {
        inputs[index as number].setSelectionRange(0, 0);
      }
    }
  }, [inputIndex]);
};

export default useFocusInput;
