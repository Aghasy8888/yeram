import { useEffect } from 'react';
import {
  calculatorIcon,
  calculatorIconActive,
  diagramIcon,
  diagramIconActive,
} from '@/public/assets';


const useTableOrDiagramEffect = (
  tableIsOpen: boolean | undefined,
  setTableOrDiagram: TSetTableOrDiagram,
) => {
  useEffect(() => {
    if (tableIsOpen) {
      setTableOrDiagram({
        diagramIcon: diagramIcon,
        tableIcon: calculatorIconActive,
      });
    } else {
      setTableOrDiagram({
        tableIcon: calculatorIcon,
        diagramIcon: diagramIconActive,
      });
    }
  }, [tableIsOpen]);
};

export default useTableOrDiagramEffect;
