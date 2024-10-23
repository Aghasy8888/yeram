import { useEffect } from 'react';

const useCloseModal = (
  modalIsOpen: boolean,
  setModalIsOpen: TSetModalIsOpen,
  tag: string = 'aside'
) => {
  const handleDocumentClick = (event: MouseEvent) => {
    if (modalIsOpen && !(event.target as Element).closest(tag)) {
      if (
        (event.target as Element).closest('dialog') ||
        (event.target as Element).closest('img')
      ) {
        return;
      }
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [modalIsOpen]);
};

export default useCloseModal;
