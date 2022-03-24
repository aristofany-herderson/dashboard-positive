import { useLogin } from "../../contexts/LoginContext";

import styles from "./styles.module.scss";

export function Login() {
  const { setPasswordState, logIn, isAuthenticationError } = useLogin();

  return (
    <>
      <section className={styles.container}>
        <div
          className={styles.warning}
          style={{ right: isAuthenticationError ? "2rem" : "-200px" }}
        >
          <div className={styles.content}>
            <div>
              <img src="/icons/error.svg" alt="" />
            </div>
            <p>Senha Incorreta</p>
          </div>
        </div>
        <div className={styles.shapes}>
          <div className={styles.row}>
            <img src="/icons/hourglass.svg" alt="" />
            <img src="/icons/lightbulb.svg" alt="" />
            <img src="/icons/photograph.svg" alt="" />
            <img src="/icons/science.svg" alt="" />
            <img src="/icons/world.svg" alt="" />
          </div>
          <div className={styles.row}>
            <img src="/icons/photograph.svg" alt="" />
            <img src="/icons/world.svg" alt="" />
            <img src="/icons/lightbulb.svg" alt="" />
            <img src="/icons/science.svg" alt="" />
            <img src="/icons/hourglass.svg" alt="" />
          </div>
          <div className={styles.row}>
            <img src="/icons/world.svg" alt="" />
            <img src="/icons/lightbulb.svg" alt="" />
            <img src="/icons/science.svg" alt="" />
            <img src="/icons/hourglass.svg" alt="" />
            <img src="/icons/photograph.svg" alt="" />
          </div>
          <div className={styles.row}>
            <img src="/icons/lightbulb.svg" alt="" />
            <img src="/icons/hourglass.svg" alt="" />
            <img src="/icons/science.svg" alt="" />
            <img src="/icons/world.svg" alt="" />
            <img src="/icons/photograph.svg" alt="" />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <h2>Sign In</h2>
            <p>and enjoy all the benefits</p>
            <div>
              <span>Senha</span>
              <input
                onChange={(event) => {
                  setPasswordState(event.target.value);
                }}
                placeholder="Digite Sua Senha"
                type="text"
              />
            </div>
            <button
              onClick={() => {
                logIn();
              }}
              type="button"
            >
              <p>Sign In</p>
              <img src="/icons/login.svg" alt="" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
