import { Container } from "@mui/material";
import Head from "next/head";

export default function Page({ tabName, children }) {
  return (
    <div className="wrapper">
      <Head>
        <title>{tabName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm" className="container">
        {children}
      </Container>
    </div>
  );
}
