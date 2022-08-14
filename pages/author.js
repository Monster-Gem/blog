import Page from "@components/page";
import { Box, Button, TextField, Typography } from "@mui/material";
import { usePosts } from "hooks/use-posts";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function AuthorPage() {
  const { register, handleSubmit } = useForm();
  const { isLoading, createPost } = usePosts();
  const router = useRouter();

  function onSubmit(data) {
    createPost(
      data,
      ({ post_id }) => post_id && router.push(`/post/${post_id}`)
    );
  }

  return (
    <Page tabName="Create a new post">
      <Typography variant="h4" align="center">
        Welcome to the writer's portal
      </Typography>
      <Box mx={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Authentication token"
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{ ...register("token") }}
          />
          <TextField
            label="Title"
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{ ...register("title") }}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{ ...register("body") }}
          />
          <Box pt={2}>
            <Button
              disabled={isLoading}
              fullWidth
              variant="contained"
              type="submit"
            >
              {isLoading ? "..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Page>
  );
}
