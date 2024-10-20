import { lazy } from "react";
import { AppRoute } from "../dto/types";
import Layout from "../layout/Layout";

const PlaceList = lazy(() => import("../components/PlaceList"));
const PlaceDetail = lazy(() => import("../components/PlaceDetail"));

export const routes: AppRoute[] = [
  {
    label: "Place List",
    path: "/",
    element: (
      <Layout>
        <PlaceList />
      </Layout>
    ),
  },
  {
    label: "Place Detail Page",
    path: "/place/:id",
    element: (
      <Layout>
        <PlaceDetail />
      </Layout>
    ),
  },
  {
    label: "404 Not Found",
    path: "*",
    element: <div>404 Not Found</div>,
  },
];
