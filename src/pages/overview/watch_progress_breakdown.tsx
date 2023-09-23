import { useAtom } from "jotai";
import * as React from "react";
import { mediaCollectionAtom } from "../../state/media_store";
import { MediaData, WatchState } from "../../state/media_types";
import { Card } from "../../components/card";
import {
  ChartPieData,
  ChartPieDataItem
} from "../../components/charts/chart_types";
import { PieChart } from "../../components/charts/pie_chart";

function getProgressData(items: MediaData[]): ChartPieData {
  const progressMap = new Map<string, ChartPieDataItem>();
  progressMap.set(WatchState.PLANNED, {
    name: WatchState.PLANNED,
    value: 0,
    itemStyle: { color: "#fac858" }
  });
  progressMap.set(WatchState.WATCHED, {
    name: WatchState.WATCHED,
    value: 0,
    itemStyle: { color: "#92cc76" }
  });
  progressMap.set(WatchState.REJECTED, {
    name: WatchState.REJECTED,
    value: 0,
    itemStyle: { color: "#ef6666" }
  });
  items.forEach(({ watchState }) => {
    progressMap.get(watchState)!.value += 1;
  });

  return Array.from(progressMap.values());
}

export const WatchProgressBreakdown = React.memo(
  function WatchProgressBreakdown(): JSX.Element {
    const [mediaItems] = useAtom(mediaCollectionAtom);

    const data: ChartPieData = React.useMemo(
      () => getProgressData(mediaItems),
      [mediaItems]
    );

    return (
      <Card>
        <PieChart
          title="Watch List - Progress"
          dataLabel="Progress"
          data={data}
        />
      </Card>
    );
  }
);
