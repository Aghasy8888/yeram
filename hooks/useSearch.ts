import { search } from '@/helpers/helpers_5';
import { selectActiveTransports } from '@/redux/features/company/companySlice';
import { selectSearchText } from '@/redux/features/other/otherSlice';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

const useSearch = (
  setObjectsToShow: TSetCompaniesToShow,
  objects: [],
  name: TName | TName[],
  searchCallBack: TSearchCallBack = search
) => {
  const searchText = useAppSelector(selectSearchText);
  const activeTransports: ITransportFromBack[] | [] = useAppSelector(selectActiveTransports);

  useEffect(() => {
    if (!searchText) {
      setObjectsToShow(objects);
      return;
    }

    const companiesToShow = objects.filter((object) => {
      return searchCallBack(object, name, searchText);
    });

    setObjectsToShow(companiesToShow);
  }, [searchText, JSON.stringify(objects), JSON.stringify(activeTransports)]);
};

export default useSearch;
