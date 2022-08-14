import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/globals.css";
import { usePosts } from "hooks/use-posts";

function Application({ Component, pageProps }) {
  const postHook = usePosts();

  return <Component {...pageProps} {...postHook} />;
}

export default Application;
