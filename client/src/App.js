import React, {Component, Suspense, lazy } from 'react';
import './App.css';
import { Nav } from './components/nav'
import Home from './pages/home'

import { BarLoader } from "react-css-loaders";
import Footer from "./components/footer";
import Search from  './components/search-container'

import Router from './container'
const LazyHero = lazy(() => import("./components/hero"));



class App extends Component {
  render() {
    return (
      <div className="App">
          <Router/>
      </div>
    );
  }
}

export default App;

// function App() {
//   return (
//       <div>
//         <div className="outer">
//           <Nav/>
//             <div className="content-wrapper">
//               <Search />
//                 <Suspense fallback={<BarLoader />}>
//                     <LazyHero />
//                 </Suspense>
//                 <Home/>
//             </div>
//         </div>
//         <Footer/>
//       </div>

//   );
// }

// export default App;
