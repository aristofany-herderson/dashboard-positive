import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../../../services/api";
import { cards } from "../../../services/JSON/Cards.json";

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
    theme,
    setThemeState,
    toggleTheme,
    setSearchTermState,
    searchTerm,
  } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("theme").valueOf() == "dark") {
      setThemeState(false);
    } else if (localStorage.getItem("theme").valueOf() == "light") {
      setThemeState(true);
    }
  }, [toggleTheme]);

  useEffect(() => {
    setSearchTermState("");
    setUserInformationsState(users);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard, {users.name}</title>
      </Head>
      <Dashboard>
        <section className={styles.contentPage}>
          {cards
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.text.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, key) => {
              return (
                <div key={key} className={styles.cardSingle}>
                  <Link href={`${val.redirect}${users.id}`}>
                    <div
                      style={{
                        background: theme ? "" : "var(--dark-mode-100)",
                        boxShadow: theme
                          ? ""
                          : "0 0 10px 0px var(--dark-mode-300)",
                      }}
                      className={styles.cardWraper}
                    >
                      <div className={styles.imageContainer}>
                        <img src={val.image} alt={val.text} />
                      </div>
                      <p>{val.text}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
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
