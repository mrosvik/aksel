import { Label } from "@navikt/ds-react";
import { GroupedHitsT, SearchHitT, searchOptions } from "@/types";
import { Hit, IconHit, IconPageHit } from "./Hit";
import React from "react";

export function Group({
  groups,
  query,
  startIndex,
  logSuccess,
}: {
  groups: GroupedHitsT;
  query: string;
  startIndex: number;
  logSuccess: (index: number, url: string) => void;
}) {
  if (Object.keys(groups).length === 0) {
    return null;
  }

  return (
    <>
      {Object.entries(groups)
        .sort((a, b) => searchOptions[a[0]].index - searchOptions[b[0]].index)
        .map(([key, val], index, arr) => {
          const prev = arr.slice(0, index);
          const total =
            prev.reduce((prev, cur) => prev + cur[1].length, 0) + startIndex;

          return (
            <GroupComponent
              logSuccess={logSuccess}
              startIndex={total}
              key={key}
              heading={`${searchOptions[key].display} (${val.length})`}
              hits={val}
              query={query}
            />
          );
        })}
    </>
  );
}

export function GroupComponent({
  heading,
  hits,
  query,
  startIndex,
  logSuccess,
}: {
  heading: React.ReactNode;
  hits: SearchHitT[];
  query: string;
  startIndex: number;
  logSuccess: (index: number, url: string) => void;
}) {
  return (
    <div>
      <div className="z-10 mt-4 rounded bg-teal-100 p-2">
        <Label className="text-text-default" as="h3">
          {heading}
        </Label>
      </div>
      <ul className="mt-2">
        {hits.map((x, xi) => {
          switch (x.item._type) {
            case "icon":
              return (
                <React.Fragment key={x.item.name + xi}>
                  <IconHit
                    key={x.item.name}
                    hit={x}
                    query={query}
                    index={startIndex + xi}
                    logSuccess={logSuccess}
                  />
                </React.Fragment>
              );
            case "icon_page":
              return (
                <React.Fragment key={x.item.heading + xi}>
                  <IconPageHit
                    key={x.item.heading}
                    hit={x}
                    query={query}
                    index={startIndex + xi}
                    logSuccess={logSuccess}
                  />
                </React.Fragment>
              );
            default:
              return (
                <React.Fragment key={x.item._id}>
                  <Hit
                    key={x.item._id}
                    hit={x}
                    query={query}
                    index={startIndex + xi}
                    logSuccess={logSuccess}
                  />
                </React.Fragment>
              );
          }
        })}
      </ul>
    </div>
  );
}
