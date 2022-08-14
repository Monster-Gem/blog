import Page from "@components/page";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { usePosts } from "hooks/use-posts";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthorPage() {
  const { register, handleSubmit } = useForm();
  const { isLoading, createPost } = usePosts();
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function handleFeedbackClose() {
    setFeedbackMessage("");
  }

  function onSubmit(data) {
    createPost(
      data,
      () => setFeedbackMessage("success"),
      () => setFeedbackMessage("error")
    );
  }

  return (
    <Page tabName="Create a new post">
      <Snackbar
        open={!!feedbackMessage}
        autoHideDuration={3000}
        onClose={handleFeedbackClose}
      >
        <Alert
          onClose={handleFeedbackClose}
          severity={feedbackMessage || "success"}
          sx={{ width: "100%" }}
        >
          {
            {
              error: "An error have occured",
              success: "Post submitted successfully!",
            }[feedbackMessage]
          }
        </Alert>
      </Snackbar>
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
