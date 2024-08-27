import React, { ReactElement, ReactNode, memo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactElement | ReactElement[] | ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{props.children}</main>
      <Footer />
    </div>
  );
}

export default memo(Layout);
