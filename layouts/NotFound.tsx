import React, { memo } from "react";
import Link from "next/link";
import styles from "../public/notfound.module.css";

interface Props {
  statusCode: number;
  description?: string;
}

function NotFound(props: Props) {
  const { statusCode, description } = props;

  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_12}>
            <div className={`${styles.col_10} ${styles.text_center}`}>
              <div className={styles.four_zero_four_bg}>
                <h1 className={styles.text_center}>404</h1>
              </div>
              <div className={styles.contant_box_404}>
                <h3 className={styles.h2}>{description || "Look like you're lost"}</h3>
                <p>The page you are looking for is not available!</p>
                <Link href="/" target="_self" className={styles.back_button}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(NotFound);
