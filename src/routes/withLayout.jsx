import { Suspense } from "react";
import CustomLoader from "../components/common/CustomLoader";

const Fallback = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
    <CustomLoader />
  </div>
);

export const withLayout = (Layout, Component, layoutProps = {}) => (
  <Suspense fallback={<Fallback />}>
    <Layout {...layoutProps}>
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    </Layout>
  </Suspense>
);
