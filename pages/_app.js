import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/globals.css";
import { usePosts, LoadingContext, PostsContext } from "hooks/use-posts";

function Application({ Component, pageProps }) {
  const { posts, isLoading } = usePosts();

  return (
    <LoadingContext.Provider value={isLoading}>
      <PostsContext.Provider value={posts}>
        <Component {...pageProps} />
      </PostsContext.Provider>
    </LoadingContext.Provider>
  );
}

export default Application;
