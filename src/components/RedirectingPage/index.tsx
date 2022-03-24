import styles from "./styles.module.scss";

export function RedirectingPage() {
  return (
    <>
      <section className={styles.container}>
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
        <div className={styles.spin} />
      </section>
    </>
  );
}
