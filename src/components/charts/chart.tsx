import * as React from "react";
import * as echarts from "echarts";
import { css } from "@emotion/css";
import { ChartOption } from "./chart_types";

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  height: 400px;
`;

export const Chart = React.memo(function Chart(props: {
  chartOptions: ChartOption;
}): JSX.Element {
  const { chartOptions } = props;

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const echartRef = React.useRef<echarts.ECharts | null>(null);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      echartRef.current?.resize();
    });
    if (wrapperRef.current) {
      echartRef.current = echarts.init(wrapperRef.current);
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      echartRef.current?.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (echartRef.current) {
      echartRef.current.setOption(chartOptions);
    }
  }, [chartOptions]);

  return <div ref={wrapperRef} className={wrapperStyle}></div>;
});
