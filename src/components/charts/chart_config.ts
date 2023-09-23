import { colors } from "../../theme/colors";
import { ChartOption, ChartPieData, ChartPieOption } from "./chart_types";

export function getCommonChartConfig(props: { title: string }): ChartOption {
  return {
    backgroundColor: "transparent",
    textStyle: {
      fontFamily: "Lato"
    },
    title: {
      text: props.title,
      left: "center",
      top: 0,
      textStyle: {
        color: colors.fontLight
      }
    },
    tooltip: {
      trigger: "item",
      backgroundColor: colors.background,
      borderWidth: 2,
      textStyle: {
        color: colors.fontLight
      }
    },
    legend: {
      bottom: "0",
      left: "center",
      itemStyle: {
        borderWidth: 0
      },
      textStyle: {
        color: colors.fontLight
      }
    }
  };
}

export function getPieChartSeriesConfig(props: {
  label: string;
  data: ChartPieData;
}): ChartPieOption {
  return {
    name: props.label,
    type: "pie",
    radius: ["40%", "70%"],
    avoidLabelOverlap: false,
    itemStyle: {},
    label: {
      show: false
    },
    emphasis: {
      label: {
        show: false
      }
    },
    labelLine: {
      show: false
    },
    data: props.data
  };
}
