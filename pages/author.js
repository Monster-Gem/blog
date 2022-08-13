import Page from "@components/page";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function AuthorPage() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(JSON.stringify(data));
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
            InputProps={{ ...register("authenticationToken") }}
          />
          <TextField
            label="Title"
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{ ...register("postTitle") }}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{ ...register("postContent") }}
          />
          <Box pt={2}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Page>
  );
}
