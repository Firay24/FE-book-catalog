import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

import * as Page from "@/page";
import AuthMiddleware from "@/middleware/authMiddleware";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<AuthMiddleware />}>
          <Route path="/" element={<Page.Layout />}>
            <Route index element={<Page.HomePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Page.LoginPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
