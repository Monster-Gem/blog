import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/globals.css";
import { usePosts } from "hooks/use-posts";
import { Amplify, PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import { useEffect, useState } from "react";

function Application({ Component, pageProps }) {
  const postHook = usePosts();
  const [subscription, setSubscription] = useState();

  useEffect(() => {
    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: "us-east-1",
        aws_pubsub_endpoint:
          "wss://a37bgehona7qfu-ats.iot.us-east-1.amazonaws.com/mqtt",
      })
    );

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
  }, [subscription]);

  return <Component {...pageProps} {...postHook} />;
}

export default Application;
