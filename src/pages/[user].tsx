import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "../services/api";

import { RedirectingPage } from "../components/RedirectingPage";

import { useLogin } from "../contexts/LoginContext";

type User = {
  id: string;
  name: string;
  year: string;
  picture: string;
};

type UserProps = {
  users: User;
};

export default function Users({ users }: UserProps) {
  const { authenticationError } = useLogin();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (users) {
        router.push(`/users/${users.id}`);
        authenticationError(false);
      } else {
        setTimeout(() => {
          router.replace("/");
          authenticationError(true);
        }, 1000);
      }
    }, 500);
  }, [users]);

  return (
    <div>
      <Head>
        <title>Validando Dados</title>
      </Head>
      <RedirectingPage />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("users");

  const paths = data.map((users) => {
    return {
      params: {
        user: users.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { user } = params;

    const { data } = await api.get(`/users/${user}`);

    const users = {
      id: data.id,
      name: data.name,
      year: data.year,
      picture: data.picture,
    };

    return {
      props: { users },
      revalidate: 60 * 60 * 24, // 24 horas
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  }
};
