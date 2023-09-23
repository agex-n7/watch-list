import * as React from "react";
import { getCommonChartConfig, getPieChartSeriesConfig } from "./chart_config";
import { ChartOption, ChartPieData } from "./chart_types";
import { Chart } from "./chart";

export const PieChart = React.memo(function PieChart(props: {
  title: string;
  dataLabel: string;
  data: ChartPieData;
}): JSX.Element {
  const { data, title, dataLabel } = props;
  const chartOptions: ChartOption = React.useMemo(() => {
    return {
      ...getCommonChartConfig({ title }),
      series: [
        {
          ...getPieChartSeriesConfig({
            label: dataLabel,
            data: data
          })
        }
      ]
    };
  }, [data, title, dataLabel]);

  return <Chart chartOptions={chartOptions} />;
});
