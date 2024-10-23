import React from 'react';

const useTableData = (reportData: IReportEntry[]) => {
    const tableData = React.useMemo(
      () =>
        reportData.reduce<Record<string, Record<string, number | string>>>(
          (acc, entry) => {
            const rowId = entry.transport_plate;
            const colId = entry.time;
            const value = entry.entered;
  
            if (!acc[rowId]) {
              acc[rowId] = { transport_plate: rowId };
            }            
            
            acc[rowId][colId] = value;

            return acc;
          },
          {}
        ),
      [reportData]
    );
  
    const columns = React.useMemo(() => {
      const uniqueTimes = Array.from(
        new Set(reportData.map((entry) => entry.time))
      );
  
      return [
        {
          Header: 'Transport ID',
          accessor: 'transport_id',
        },
        ...uniqueTimes.map((time) => ({
          Header: time,
          accessor: time,
        })),
      ];
    }, [reportData]);

    return {
        columns,
        tableData,
    }
  }

export default useTableData;