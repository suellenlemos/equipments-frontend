import { BarChart } from '@mui/x-charts/BarChart';
import { Equipment } from '../../../../app/entities/Equipment';

export const EquipmentsChart = ({
  value,
  last_24,
  last_48,
  last_week,
  last_month,
}: Equipment) => {
  return (
    <BarChart
      width={520}
      height={360}
      xAxis={[
        {
          id: value,
          data: ['Last Month', 'Last Week', 'Last 48h', 'Last 24h'],
          scaleType: 'band',
          labelStyle: {
            fontSize: '20px',
          },
        },
      ]}
      series={[
        {
          data: [last_month, last_week, last_48, last_24],
          highlightScope: {
            fade: 'series',
          },
          color: '#847BFB',
        },
      ]}
    />
  );
};
