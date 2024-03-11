import { useAppSelector } from '@/store/store';
import { useEffect } from 'react';

const useSearch = (
  setObjectsToShow: TSetCompaniesToShow,
  objects: [],
  name: keyof ICompany | keyof ITransportFromBack,
  defaultObjects: []
) => {
  const searchText = useAppSelector((state) => state.otherReducer.searchText);

  useEffect(() => {
    if (!searchText) {
      setObjectsToShow(defaultObjects);
      return;
    }

    const companiesToShow = objects.filter((object) => {
      const title = (object[name] as string).toUpperCase();

      return title.includes(searchText.trim());
    });

    setObjectsToShow(companiesToShow);
  }, [searchText]);
};

export default useSearch;
