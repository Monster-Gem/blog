import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Notes as NotesIcon, Create as CreateIcon } from "@mui/icons-material";

export default function Page({ tabName, children }) {
  const router = useRouter();
  const routes = ["/", "/author"];

  return (
    <div className="wrapper">
      <Head>
        <title>{tabName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm" className="container">
        {children}
      </Container>

      <BottomNavigation
        showLabels
        value={routes.indexOf(router.route)}
        onChange={(_, newValue) => {
          router.push(routes[newValue]);
        }}
        className="bottom-navigation"
      >
        <BottomNavigationAction label="Read" icon={<NotesIcon />} />
        <BottomNavigationAction label="Write" icon={<CreateIcon />} />
      </BottomNavigation>
    </div>
  );
}
