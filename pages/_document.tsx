import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
//import * as GlobalStyle from "../static/globals.css";

class LeaderDocument extends Document {
  public render() {
    return (
      <Html lang={"tr"}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LeaderDocument;
