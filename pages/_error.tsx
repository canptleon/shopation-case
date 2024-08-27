import React from "react";
import HtmlHead from "@/components/HtmlHead";
import NotFound from "@/layouts/NotFound";

interface Props {
  statusCode: number;
  error: any;
}

function Error(props: Props) {
  console.error("Error page!", {
    statusCode: props.statusCode,
    error: props.error,
  });

  return (
    <>
      <HtmlHead title="Sayfa Bulunamadı" />
      <NotFound statusCode={props.statusCode} />
    </>
  );
}

Error.getInitialProps = async ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode, error: err };
};

export default Error;
