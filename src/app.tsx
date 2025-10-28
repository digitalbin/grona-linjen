import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import Footer from "@/components/Footer";
import "@/styles/app.css";

injectSpeedInsights();
inject({
  mode: import.meta.env.DEV ? "development" : "production",
});

const Header = clientOnly(() => import("@/components/Header"));

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Header />
          <Suspense>{props.children}</Suspense>
          <Footer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
