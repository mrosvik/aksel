import { Provider } from "@navikt/ds-react";
import PreviewBanner from "components/website-modules/PreviewBanner";
import {
  initAmplitude,
  usePageView,
} from "components/website-modules/utils/amplitude";
import { useScrollToHashOnPageLoad } from "components/website-modules/utils/util";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect } from "react";
import { IdContext } from "../components/website-modules/utils/contexts/id-context";
import "../styles/index.css";

initAmplitude();

function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: Router;
}) {
  useScrollToHashOnPageLoad();
  usePageView(router, pageProps);

  useEffect(() => {
    if (window.location.host === "design.nav.no") {
      window.location.replace(`http://aksel.nav.no`);
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://aksel.nav.no${router.asPath.split("?")[0]}`}
          key="ogurl"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <meta property="og:site_name" content="Aksel" key="ogsitename" />
      </Head>
      {pageProps?.preview && <PreviewBanner />}

      <Provider>
        <IdContext.Provider
          value={{ id: pageProps?.id ?? pageProps?.page?._id }}
        >
          <Component {...pageProps} />
        </IdContext.Provider>
      </Provider>
    </>
  );
}

export default App;
