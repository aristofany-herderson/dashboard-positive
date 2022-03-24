import { useEffect, useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { api } from "../../../services/api";

import { Dashboard } from "../../../components/Dashboard";

import { useLogin } from "../../../contexts/LoginContext";

import styles from "./styles.module.scss";

type User = {
  id: string;
  name: string;
  picture: string;
  year: string;
};

type UserProps = {
  users: User;
};

export default function Users({ users }: UserProps) {
  const {
    setUserInformationsState,
    setToggleThemeState,
    setLocalStorageTheme,
  } = useLogin();
  const inputRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("theme").valueOf() == "dark") {
      inputRef.current.checked = true;
    } else if (localStorage.getItem("theme").valueOf() == "light") {
      inputRef.current.checked = false;
    }

    setUserInformationsState(users);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard, {users.name}</title>
      </Head>
      <Dashboard>
        <section className={styles.contentPage}>
          <h2>Tema</h2>
          <label>
            <input ref={inputRef} type="checkbox" />
            <span
              onClick={() => {
                setToggleThemeState();
                setLocalStorageTheme();
              }}
              className={styles.check}
            />
          </label>
        </section>
      </Dashboard>
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
      picture: data.picture,
      year: data.year,
    };

    return {
      props: { users },
      revalidate: 60 * 60 * 24, // 24 horas
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
};
