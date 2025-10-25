import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { clientOnly } from "@solidjs/start";
import "@/styles/app.css";
import Footer from "./components/Footer";

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
