import { List } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <List as="ol" title="Vi bør fikse uu-issues i følgende rekkefølge:">
      <List.Item>
        Blinkende innhold. Vi vil ikke gi brukerne våre anfall.
      </List.Item>
      <List.Item>
        Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
      </List.Item>
      <List.Item>
        Kritiske problemer og problemer med høye barrierer på innhold med høy
        effekt.
      </List.Item>
      <List.Item>Middels barrierer på innhold med høy effekt.</List.Item>
      <List.Item>Middels barrierer på innhold med middels effekt.</List.Item>
    </List>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Husk å sette riktig nivå/tag på List elementet hvis du bruker en tittel.",
};
