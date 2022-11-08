import { createBrowserRouter } from "react-router-dom";
import UnionFind from "../algo/union-find";
import Root from "../App";

export const PATH = {
  HOME: "/",
  UNION_FIND: "union-find",
};

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Root />,
    children: [
      {
        path: PATH.UNION_FIND,
        element: <UnionFind />,
      },
    ],
  },
]);

export default router;
