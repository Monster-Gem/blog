import Page from "@components/page";
import { useRouter } from "next/router";
import { usePosts } from "hooks/use-posts";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const { getPosts, post, isLoading } = usePosts();
  useEffect(() => {
    getPosts(id);
  }, [id]);

  return (
    <Page tabName={isLoading ? "Loading post" : post?.title}>
      {isLoading || !post || post?.post_id !== Number(id) ? (
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      ) : (
        <Box>
          <Typography gutterBottom variant="h4" align="center">
            {post.title}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="caption">{post.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.created_at).toLocaleDateString()}
            </Typography>
          </Box>

          <Box py={4}>
            <Typography align="justify">{post.body}</Typography>
          </Box>
        </Box>
      )}
    </Page>
  );
}
