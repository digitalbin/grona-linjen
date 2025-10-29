import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/app.css";

if (import.meta.env.PROD) {
  injectSpeedInsights();
  inject({
    mode: "production",
  });
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Header />
          <main>
            <Suspense>{props.children}</Suspense>
          </main>
          <Footer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
