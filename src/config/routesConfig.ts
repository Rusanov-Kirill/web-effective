import React from 'react';
import Characters from "../pages/Characters";
import Comics from "../pages/Comics";
import CharacterDetails from "../pages/CharacterDetails";
import ComicDetails from "../pages/ComicDetails";
import { RouteObject } from "react-router-dom";

const routesConfig: RouteObject[] = [
  { path: '/', element: React.createElement(Characters), index: true },
  { path: '/characters', element: React.createElement(Characters) },
  { path: '/comics', element: React.createElement(Comics) },
  { path: '/characters/:id', element: React.createElement(CharacterDetails) },
  { path: '/comics/:id', element: React.createElement(ComicDetails) }
];

export default routesConfig;

