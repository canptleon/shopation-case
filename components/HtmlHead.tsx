import React, { memo } from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  url?: string;
}

function HtmlHead(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/images/favicon.png" sizes="16x16" type="image/png" />
    </Head>
  );
}

export default memo(HtmlHead);
