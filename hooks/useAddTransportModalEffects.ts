import { focusBeforeTwoSpaces } from '@/helpers/helpers_5';
import { useEffect } from 'react';

const useAddTransportModalEffects = (
  input: HTMLInputElement | undefined,
  setInputs: TSetInputs,
) => {

  useEffect(() => {
    input && focusBeforeTwoSpaces(input);
  }, [input]);

  useEffect(() => {
    setInputs(
      document.querySelectorAll('input') as NodeListOf<HTMLInputElement>
    );
  }, []);
};

export default useAddTransportModalEffects;
