import { useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isLoadingCreate, setLoadingCreate] = useState(false);

  const baseApiUrl =
    "https://itfpz6mc7f.execute-api.us-east-1.amazonaws.com/default";

  function getPosts(id) {
    setLoadingPosts(true);
    fetch(`${baseApiUrl}/getPost/${id ?? ""}`)
      .then((res) => res.json())
      .then((posts) => {
        id ? setPost(posts[0]) : setPosts(posts);
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
      .then(() => {
        setLoadingCreate(false);
      });
  }

  return {
    isLoading: isLoadingPosts || isLoadingCreate,
    posts,
    post,
    getPosts,
    createPost,
  };
}
