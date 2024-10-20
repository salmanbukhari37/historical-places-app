import { RouteObject } from "react-router-dom";

export interface Place {
  id: number;
  name: string;
  title?: string;
  description: string;
  visited: boolean;
  imageUrl?: string;
  country?: string;
}

export interface State {
  places: Place[];
}

export type AppRoute = RouteObject & {
  label?: string;
  element: JSX.Element; // Ensure element is of type JSX.Element
};

// export interface AppRoute extends RouteObject {
//   label?: string;
//   element: JSX.Element; // Ensure element is of type JSX.Element
// }

// export type AppRoute = RouteObject & {
//   label?: string; // Optional label if you're managing a menu or breadcrumbs
//   path: any; // Path for the route
//   element: React.ReactNode; // JSX Element or component to render for the route
// };
