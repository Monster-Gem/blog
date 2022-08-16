import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/globals.css";
import { usePosts } from "hooks/use-posts";
import { Amplify, PubSub, Auth } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { useEffect, useState } from "react";

function Application({ Component, pageProps }) {
  const postHook = usePosts();
  const [subscription, setSubscription] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Auth.configure({
      aws_cognito_region: "us-east-1",
      aws_cognito_identity_pool_id:
        "us-east-1:7b2d6f8d-c707-4084-9c45-4fdb82a9ee76",
    });

    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: "us-east-1",
        aws_pubsub_endpoint:
          "wss://a37bgehona7qfu-ats.iot.us-east-1.amazonaws.com/mqtt",
      })
    );

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!subscription) {
      setSubscription(
        PubSub.subscribe("newPost").subscribe({
          next: postHook.addPostToCache,
          error: (error) => console.error(error),
          complete: () => console.log("Done"),
        })
      );
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [ready, subscription]);

  return <Component {...pageProps} {...postHook} />;
}

export default Application;
