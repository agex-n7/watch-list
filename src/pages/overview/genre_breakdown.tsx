import { useAtom } from "jotai";
import * as React from "react";
import { mediaCollectionAtom } from "../../state/media_store";
import { MediaData } from "../../state/media_types";
import { Card } from "../../components/card";
import { ChartPieData } from "../../components/charts/chart_types";
import { PieChart } from "../../components/charts/pie_chart";

function getGenreData(items: MediaData[]): ChartPieData {
  const genreMap = new Map<string, number>();
  items.forEach(({ genre }) => {
    if (genreMap.has(genre)) {
      genreMap.set(genre, genreMap.get(genre)! + 1);
    } else {
      genreMap.set(genre, 1);
    }
  });

  return Array.from(genreMap.entries()).map(([genre, count]) => ({
    value: count,
    name: genre
  }));
}

export const GenreBreakdown = React.memo(
  function GenreBreakdown(): JSX.Element {
    const [mediaItems] = useAtom(mediaCollectionAtom);
    const data: ChartPieData = React.useMemo(() => getGenreData(mediaItems), [
      mediaItems
    ]);

    return (
      <Card>
        <PieChart title="Watch List - Genres" dataLabel="Genre" data={data} />
      </Card>
    );
  }
);
