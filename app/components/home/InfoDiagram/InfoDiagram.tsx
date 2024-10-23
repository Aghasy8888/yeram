import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import useTableData from '@/hooks/useTableData';
import { useTable } from 'react-table';
import { processPeriods, sortReportData, sumReportDataEntries } from '@/helpers/helpers_3';
import { selectReportType, selectReports } from '@/redux/features/transport/transportSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './InfoDiagramStyles.module.scss';

const InfoDiagram = () => {
  const reportData: IReportEntry[] = useAppSelector(selectReports);
  const reportType: string = useAppSelector(selectReportType);
  const { tableData, columns } = useTableData(reportData);

  const { headerGroups } = useTable({
    columns,
    data: Object.values(tableData),
  });

  const formattedPeriods = processPeriods(headerGroups, reportType);
  const sortedReportData = sortReportData(reportData);
  const totalCameInOut = sumReportDataEntries(sortedReportData);
  
  const chartData = {
    labels: formattedPeriods,
    datasets: [
      {
        label: 'ЗАШЕДШИЕ',
        data: totalCameInOut.map((entry) => entry.entered),
        backgroundColor: '#3dcb67',
      },
      {
        label: 'ВЫШЕДШИЕ',
        data: totalCameInOut.map((entry) => entry.exited),
        backgroundColor: '#721ab9',
        hidden: true,
      },
    ],
  };

  return (
    <div className={styles.infoDiagram} translate="no">
      <div className={styles.container}>
        {
          // @ts-ignore
          <Bar data={chartData} />
        }
      </div>
    </div>
  );
};

export default InfoDiagram;
