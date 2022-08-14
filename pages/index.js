import Page from "@components/page";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  CardContent,
} from "@mui/material";
import { usePosts } from "hooks/use-posts";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();

  const { getPosts, posts, isLoading } = usePosts();
  useEffect(getPosts, []);

  return (
    <Page tabName="Read posts">
      <Typography variant="h4" align="center">
        Recent posts
      </Typography>
      <Box mx={4} my={2}>
        {isLoading ? (
          <Typography variant="h5" align="center">
            Loading...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {posts.map(({ name, id, title }) => (
              <Grid key={id} item xs={12}>
                <Card elevation={2}>
                  <CardActionArea onClick={() => router.push(`/post/${id}`)}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Page>
  );
}
