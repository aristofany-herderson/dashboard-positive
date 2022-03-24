import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { api } from "../../services/api";

import { SucefullSignUp } from "../../components/SucefullSignUp";

import { useLogin } from "../../contexts/LoginContext";
import { useEffect } from "react";

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
  const { setUserInformationsState } = useLogin();

  useEffect(() => {
    setUserInformationsState(users);
  }, []);

  return (
    <>
      <Head>
        <title>Bem vindo, {users.name}</title>
      </Head>
      <SucefullSignUp users={users} />
    </>
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
