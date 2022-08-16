import { useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [isLoadingPosts, setLoadingPosts] = useState(false);
  const [isLoadingCreate, setLoadingCreate] = useState(false);
  const [haveFetchedList, setHaveFetchedList] = useState(false);

  const baseApiUrl =
    "https://itfpz6mc7f.execute-api.us-east-1.amazonaws.com/default";

  function addPostToCache({ value }) {
    setPosts((currentPosts) => ({
      ...currentPosts,
      [value.post_id]: { ...currentPosts[value.post_id], ...value },
    }));
  }

  function getPosts(id) {
    if (id && posts?.[id]?.body) return setPost(posts[id]);
    if (!id && haveFetchedList) return;

    setLoadingPosts(true);
    fetch(`${baseApiUrl}/getPost/${id ?? ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (id) setPost(data[0]);
        setPosts((currentPosts) => {
          return [...Object.values(currentPosts), ...data].reduce(
            (previousValue, currentValue) => ({
              ...previousValue,
              [currentValue.post_id]: {
                ...previousValue[currentValue.post_id],
                ...currentValue,
              },
            }),
            {}
          );
        });
        setHaveFetchedList(true);
        setLoadingPosts(false);
      });
  }

  function createPost(data, onSuccess, onError) {
    setLoadingCreate(true);
    fetch(`${baseApiUrl}/postPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch(onError)
      .finally(() => {
        setLoadingCreate(false);
      });
  }

  return {
    isLoading: isLoadingPosts || isLoadingCreate,
    posts,
    post,
    getPosts,
    createPost,
    addPostToCache,
  };
}
