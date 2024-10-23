'use client';

import React from 'react';
import { useTable } from 'react-table';
import * as constants from '@/data/stepConstants';
import {
  getTableHeaderByStep,
  sortHeaders,
  sortObjectByDates,
} from '@/helpers/helpers_3';
import useTableData from '@/hooks/useTableData';
import { formatGosNumbers } from '@/helpers';
import { sortObjectPropertiesAlphabetically } from '@/helpers/helpers_4';
import { selectReportType, selectReports } from '@/redux/features/transport/transportSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './InfoTableStyles.module.scss';

const InfoTable = () => {
  const reportType: string = useAppSelector(selectReportType);

  const reportData: IReportEntry[] = useAppSelector(selectReports);


  const { tableData, columns } = useTableData(reportData);
  const sortedTableData = sortObjectPropertiesAlphabetically(tableData);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: Object.values(sortedTableData) });

  const gosNumbers = rows.map((row) => row.original.transport_plate);

  const gosNumberComponents = gosNumbers.map((gosNumber, index) => (
    <div className={styles.firstColumn} key={gosNumber ? gosNumber : index}>
      {formatGosNumbers(gosNumber as string)}
    </div>
  ));

  const rowComponents = rows.map((row, i) => {
    const sortedValues = sortObjectByDates(row.values);
    const valuesArray: (number | undefined)[] = Object.values(sortedValues);
    prepareRow(row);

    return (
      <tr {...row.getRowProps()} key={i}>
        {valuesArray.map((value: number | undefined, index: number) => (
          <td
            className={`${styles.column} ${index === 0 ? styles.headerId : ''}`}
            key={index}
          >
            {value}
          </td>
        ))}
      </tr>
    );
  });

  const tableHeaderComponents = headerGroups.map((headerGroup, index) => {
    const sortedHeaders = sortHeaders(headerGroup);

    return (
      <tr {...headerGroup.getHeaderGroupProps()} key={index}>
        {sortedHeaders.map((column, index) => {
          const tableHeaderCell = getTableHeaderByStep(
            column.id,
            reportType,
            index
          );

          return (
            <td
              className={`${styles.columnPeriod} ${
                reportType !== constants.HOURS ? styles.columnPeriod12Px : ''
              } ${index === 0 ? styles.headerId : ''}`}
              {...column.getHeaderProps()}
              key={index}
            >
              {column.id !== constants.TRANSPORT_ID &&
              reportType !== constants.HOURS ? (
                reportType !== constants.MONTHS ? (
                  tableHeaderCell
                ) : (
                  <>
                    <div>{tableHeaderCell.split(',')[0]}</div>
                    <div>{tableHeaderCell.split(',')[1]}</div>
                  </>
                )
              ) : (
                <>
                  <div className={styles.hoursPeriod}>
                    {tableHeaderCell.split(',')[1]}
                  </div>
                  <div className={styles.date}>
                    {tableHeaderCell.split(',')[0]}
                  </div>
                </>
              )}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <section className={styles.infoTable} translate="no">
      <div className={styles.container}>
        <div className={styles.gosNumbersAndCtn}>
          <div className={styles.gosNumbersCtn}>
            {gosNumberComponents} <hr />
          </div>
          <div className={styles.gosNumbersDataCtn}>
            <table className={styles.table} {...getTableProps()}>
              <tbody {...getTableBodyProps()}>
                {rowComponents}
                {tableHeaderComponents}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoTable;
