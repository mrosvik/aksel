import { useDebounce } from "@/utils";
import { Chips, Heading, Search } from "@navikt/ds-react";
import { useState } from "react";
import useSWR from "swr";

const options = [
  { key: "alle", display: "Alle" },
  { key: "gp", display: "God praksis" },
  { key: "komponenter", display: "Komponenter" },
  { key: "prinsipper", display: "Prinsipper" },
  { key: "grunnleggende", display: "Grunnleggende" },
  { key: "blogg", display: "Blogg" },
];

export const GlobalSearch = () => {
  const [q, setQ] = useState("");
  const [toggled, setToggled] = useState(options[0].key);

  const debouncedSearch = useDebounce(q);

  const {
    data: initialData,
    error: initialError,
    isValidating: initialValidating,
  } = useSWR(`/api/search/v1/initial`, (query) =>
    fetch(query).then((res) => res.json())
  );

  const {
    data: queryData,
    error: queryError,
    isValidating: queryValidating,
  } = useSWR(
    debouncedSearch !== ""
      ? `/api/search/v1?q=${encodeURIComponent(debouncedSearch)}&doc=${toggled}`
      : null,
    (query) =>
      fetch(query).then((res) => {
        console.count("called");
        return res.json();
      }),
    {}
  );

  console.log(queryData);

  return (
    <div>
      <div>
        <Search
          label="søk"
          variant="simple"
          value={q}
          onChange={setQ}
          onClear={() => setQ("")}
        />
        <Chips className="mt-5">
          {options.map((x) => (
            <Chips.Toggle
              key={x.key}
              selected={toggled === x.key}
              onClick={() => setToggled(x.key)}
            >
              {x.display}
            </Chips.Toggle>
          ))}
        </Chips>
      </div>
      <div className="mt-8">
        <Heading level="2" size="small">
          Søkte artikler
        </Heading>
        <ul>
          {!queryError &&
            queryData &&
            queryData?.map((x, xi) => <li key={xi}>{x.heading}</li>)}
        </ul>
        <Heading level="2" size="small">
          Nyeste artikler
        </Heading>
        <ul>
          {initialData?.map((x, xi) => (
            <li key={xi}>{x.heading}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
