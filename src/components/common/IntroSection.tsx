import styles from "@/css/common/IntroSection.module.css";
import { motion } from "framer-motion";

type Props = {
  title: string[];
  description: string[];
  imageUrl: string;
  imageAlt?: string;
  backGroundColor?: "default" | "white";
};

export default function IntroSection({
  title,
  description,
  imageUrl,
  imageAlt,
  backGroundColor = "default",
}: Props) {
  return (
    <motion.section
      className={`${styles.wrapper} ${backGroundColor === "white" ? styles.whiteBg : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          {title.map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </h2>

        <p className={styles.description}>
          {description.map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className={styles.imageContainer}>
        <motion.img
          src={imageUrl}
          alt={imageAlt || "설명 이미지"}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  );
}
