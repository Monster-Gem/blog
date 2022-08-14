import { useState, createContext } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setLoadingPosts] = useState(false);

  function getPosts() {
    setLoadingPosts(true);
    fetch(
      "https://itfpz6mc7f.execute-api.us-east-1.amazonaws.com/default/getPost/"
    )
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoadingPosts(false);
      });
  }

  return { isLoading: isLoadingPosts, posts, getPosts };
}

export const PostsContext = createContext([]);

export const LoadingContext = createContext(false);
