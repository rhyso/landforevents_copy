import React, {Component, Suspense, lazy } from 'react';
import { Nav } from './components/nav'
import Home from './pages/home'

import { BarLoader } from "react-css-loaders";
import Footer from "./components/footer";

const LazyHero = lazy(() => import("./components/hero"));

function HomeApp() {
  return (
      <div>
        <div className="outer">
          <Nav/>
          <Suspense fallback={<BarLoader />}>
            <LazyHero />
          </Suspense>
            <div className="content-wrapper">
                <Home/>
            </div>
        </div>
        <Footer/>
      </div>

  );
}

export default HomeApp;
