import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import DisplayMonsters from './routes/DisplayMonsters.tsx';
import MonsterShow from './routes/MonsterShow.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "list",
    element: <DisplayMonsters />,
  },
  {
    path: "show",
    element: <MonsterShow />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
