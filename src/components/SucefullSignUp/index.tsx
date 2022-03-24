import { useLogin } from "../../contexts/LoginContext";

import styles from "./styles.module.scss";

type User = {
  id: string;
  name: string;
};

type SucefullSignUpProps = {
  users: User;
};

export function SucefullSignUp({ users }: SucefullSignUpProps) {
  const { setInitialLocalStorage, redirectToDashboard } = useLogin();

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.loginInformation}>
          <img src="/icons/check.svg" alt="Logado com sucesso" />
          <p>Logado com Sucesso</p>
        </div>
        <h2>
          Bem vindo, <span>{users.name}</span>
        </h2>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => {
              setInitialLocalStorage();
              redirectToDashboard();
            }}
          >
            <img src="/icons/people.svg" alt="" />
            <p>Meus Dados</p>
          </button>
          <button>
            <img src="/icons/world.svg" alt="" />
            <p>Blog</p>
          </button>
        </div>
      </div>
    </section>
  );
}
