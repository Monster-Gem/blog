import { useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isLoadingCreate, setLoadingCreate] = useState(false);

  const baseApiUrl =
    "https://itfpz6mc7f.execute-api.us-east-1.amazonaws.com/default";

  function getPosts() {
    setLoadingPosts(true);
    fetch(`${baseApiUrl}/getPost/`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoadingPosts(false);
      });
  }

  function createPost(data) {
    setLoadingCreate(true);
    fetch(`${baseApiUrl}/postPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
        setLoadingCreate(false);
      });
  }

  return {
    isLoading: isLoadingPosts || isLoadingCreate,
    posts,
    getPosts,
    createPost,
  };
}
