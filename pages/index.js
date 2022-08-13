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

export default function IndexPage() {
  const router = useRouter();
  const posts = [
    { id: 1, title: "A new hope", author: "George Lucas" },
    { id: 2, title: "The empire strikes back", author: "George Lucas" },
  ];

  return (
    <Page tabName="Read posts">
      <Typography variant="h4" align="center">
        Recent posts
      </Typography>
      <Box mx={4} my={2}>
        <Grid container spacing={2}>
          {posts.map(({ author, id, title }) => (
            <Grid key={id} item xs={12}>
              <Card elevation={2}>
                <CardActionArea onClick={() => router.push(`/post/${id}`)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Page>
  );
}
