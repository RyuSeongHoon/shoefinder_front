import "../styles/globals.css";
import Amplify from "aws-amplify";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-2:4ad24740-0f4a-4946-aa72-33fb163d7b5c", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "ap-northeast-2", // REQUIRED - Amazon Cognito Region
    userPoolId: "ap-northeast-2_QxUmgA7Bg", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "3hvhpn6vhjodqcmkvudajft432", //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "shoefindere0a0e28b90174ca9bebcbcdf0507e170155323-dev", //REQUIRED -  Amazon S3 bucket name
      region: "ap-northeast-2", //OPTIONAL -  Amazon service region
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
