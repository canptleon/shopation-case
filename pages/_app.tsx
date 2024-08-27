import React from 'react';
import "@/public/globals.css";
import { useCallback } from "react";
import type { AppProps } from "next/app";
import { AppWrapper } from "@/context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PageProps {
  statusCode?: number;
  query?: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  const renderPage = useCallback(() => {
    const modifiedPageProps = { ...pageProps };

    return (
      <AppWrapper>
        <Component {...modifiedPageProps} />
        <ToastContainer />
      </AppWrapper>
    );
  }, [pageProps]);

  return renderPage();
}

export default MyApp;
