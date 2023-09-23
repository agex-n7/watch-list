import * as echarts from "echarts";

// Some echarts types are hard to read, and many are not exposed.
// These are helper types to retain and expose typings needed for the charts

export type ChartOption = echarts.EChartsOption;
export type ChartSeriesOption = echarts.SeriesOption;
export type ChartPieOption = echarts.PieSeriesOption;
export type ChartPieDataItem = {
  name?: string;
  value: number;
  itemStyle?: { color?: string };
};
export type ChartPieData = ChartPieDataItem[];
