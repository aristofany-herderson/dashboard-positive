import { ReactNode, useEffect } from "react";
import Link from "next/link";

import { useLogin } from "../../contexts/LoginContext";

import styles from "./styles.module.scss";

type User = {
  id: string;
  name: string;
  picture: string;
  year: string;
};

type DashboardProps = {
  children: ReactNode;
};

export function Dashboard({ children }: DashboardProps) {
  const {
    userInformations,
    theme,
    setThemeState,
    toggleTheme,
    setSearchTermState,
  } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("theme").valueOf() == "dark") {
      setThemeState(false);
    } else if (localStorage.getItem("theme").valueOf() == "light") {
      setThemeState(true);
    }
  }, [toggleTheme]);

  return (
    <section
      style={{
        color: theme ? "var(--gray-800)" : "var(--dark-mode-10)",
      }}
      className={styles.container}
    >
      <aside
        style={{
          background: theme ? "" : "var(--dark-mode-200)",
          borderColor: theme ? "" : "var(--dark-mode-300)",
        }}
      >
        <div className={styles.logo}>
          <span>Positivo.</span>
        </div>
        <div className={styles.menu}>
          <h4>Menu</h4>
          <ul>
            <Link href={`/dashboard/home/${userInformations.id}`}>
              <li style={{ background: theme ? "" : "var(--dark-mode-200)" }}>
                <img src="/icons/compass.svg" alt="Browse" />
                <p>Browse</p>
              </li>
            </Link>
          </ul>
          <h4>General</h4>
          <ul>
            <Link href={`/dashboard/settings/${userInformations.id}`}>
              <li style={{ background: theme ? "" : "var(--dark-mode-200)" }}>
                <img src="/icons/settings.svg" alt="Settings" />
                <p>Settings</p>
              </li>
            </Link>
            <Link href="/">
              <li style={{ background: theme ? "" : "var(--dark-mode-200)" }}>
                <img src="/icons/logout.svg" alt="Log Out" />
                <p>Log out</p>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
      <main style={{ background: theme ? "" : "var(--dark-mode-100)" }}>
        <header className={styles.header}>
          <div className={styles.searchInput}>
            <img src="/icons/search.svg" alt="Procurar" />
            <input
              style={{
                color: theme ? "" : "var(--dark-mode-10)",
              }}
              onChange={(event) => {
                setSearchTermState(event.target.value);
              }}
              placeholder="Procurar..."
              type="search"
            />
          </div>
          <div className={styles.user}>
            <div className={styles.imageContainer}>
              <div
                className={styles.image}
                style={{ background: `url('${userInformations.picture}')` }}
              />
            </div>
            <div className={styles.userName}>
              <h3
                style={{
                  color: theme ? "" : "var(--dark-mode-10)",
                }}
              >
                {userInformations.name}
              </h3>
              <p
                style={{
                  color: theme ? "" : "var(--gray-500)",
                }}
              >
                {userInformations.year} ano
              </p>
            </div>
          </div>
        </header>
        {children}
      </main>
    </section>
  );
}
