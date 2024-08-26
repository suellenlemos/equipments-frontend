import { BarChart } from '@mui/x-charts/BarChart';
import { Equipment } from '../../../../app/entities/Equipment';

export interface EquipmentsChartProps {
  equipment: Equipment;
}

export const EquipmentsChart = ({ equipment }: EquipmentsChartProps) => {
  return (
    <BarChart
      xAxis={[
        {
          id: equipment.value,
          data: ['Last Month', 'Last Week', 'Last 48h', 'Last 24h'],
          scaleType: 'band',
          labelStyle: {
            fontSize: '20px',
          },
        },
      ]}
      series={[
        {
          data: [
            equipment.last_month,
            equipment.last_week,
            equipment.last_48,
            equipment.last_24,
          ],
          highlightScope: {
            fade: 'series',
          },
          color: '#847BFB',
        },
      ]}
    />
  );
};
