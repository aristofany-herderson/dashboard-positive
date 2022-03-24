import Head from "next/head";

import { LoginContextProvider } from "../contexts/LoginContext";

import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="author" content="Aristofany Herderson" />
        <meta http-equiv="content-language" content="pt-br, en-US" />
        <meta name="copyright" content="© 2021 Aristofany" />
        <meta
          name="description"
          content="Desenvolvido por Aristofany Herderson"
        />
        <meta name="keywords" content="Dashboard, Positivo" />
        <meta name="theme-color" content="#FFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          property="og:title"
          content="Dashboard Positive - Seu Dashboard para Apresentações"
        />
        <meta property="og:site_name" content="Dashboard Positive" />
        <meta
          property="og:description"
          content="Dashboard Positive - Site desenvolvido para apresentações"
        />
        <meta property="og:url" content="http:localhost:3000/" />
        <meta
          property="og:image"
          content="https://scontent.fcpv18-1.fna.fbcdn.net/v/t1.6435-9/72850357_2701611099965247_6332847342860894208_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=CFk6KISfk14AX9lkmoI&_nc_ht=scontent.fcpv18-1.fna&oh=839aa94495fbda7c85ee37f71756d5fe&oe=60BE8CFA"
        />
      </Head>
      <LoginContextProvider>
        <Component {...pageProps} />
      </LoginContextProvider>
    </>
  );
}

export default MyApp;
