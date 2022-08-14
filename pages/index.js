import Page from "@components/page";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function IndexPage({ getPosts, posts, isLoading }) {
  const router = useRouter();

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
            {Object.values(posts).map(
              ({ name, post_id, title }) =>
                post_id && (
                  <Grid key={post_id} item xs={12}>
                    <Card elevation={2}>
                      <CardActionArea
                        onClick={() => router.push(`/post/${post_id}`)}
                      >
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
                )
            )}
          </Grid>
        )}
      </Box>
    </Page>
  );
}
