import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './pages/Homepage.jsx';
import App from './App.jsx'
import Huiyi1_1 from './pages/Huiyi1_1.jsx';
import Huiyi1_2 from './pages/Huiyi1_2.jsx';
import MP_1 from './pages/MP_1.jsx';
import ZiXun from './pages/ZiXun.jsx';
import CeHua from './pages/CeHua.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'normalize.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "app",
    element: <App/>
  },
  {
    path: "form/huiyijihua",
    element: <Huiyi1_1/>,
  },
  {
    path: "form/huiyijiyao",
    element: <Huiyi1_2/>,
  },
  {
    path: "form/market_promotion_1",
    element: <MP_1/>,
  },
  {
    path: "form/huiyizixun",
    element: <ZiXun/>,
  },
  {
    path: "form/cehua",
    element: <CeHua/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
