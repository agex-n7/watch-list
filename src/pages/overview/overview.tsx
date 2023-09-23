import * as React from "react";
import { css } from "@emotion/css";
import { PageHeader } from "../../components/page_header";
import { GenreBreakdown } from "./genre_breakdown";
import { WatchProgressBreakdown } from "./watch_progress_breakdown";
import { useAtom } from "jotai";
import { mediaCollectionAtom } from "../../state/media_store";
import { Link } from "wouter";

const overviewStyle = css`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-bottom: 16px;

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Overview = React.memo(function Overview(): JSX.Element {
  const [mediaItems] = useAtom(mediaCollectionAtom);

  return (
    <div>
      <PageHeader>Overview</PageHeader>
      <div className={overviewStyle}>
        {mediaItems.length ? (
          <>
            <WatchProgressBreakdown />
            <GenreBreakdown />
          </>
        ) : (
          <div className="no-data">
            <p>
              Nothing to show, add something to your{" "}
              <Link href="/watchlist" className="link">
                watch list
              </Link>{" "}
              first!
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
