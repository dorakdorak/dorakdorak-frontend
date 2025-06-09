import { ReactNode } from "react";
import styles from "@/css/main/DosirakSection.module.css";
import SectionTitle from "@/components/main/SectionTitle";
import DosirakCard from "@/components/main/DosirakCard";

interface DosirakBox {
  image: string;
  tag: string;
}

interface DosirakSectionProps {
  title: string;
  description?: ReactNode;
  boxes: DosirakBox[];
  to: string;
  cardTo: string;
}

const DosirakSection = ({ title, description, boxes, to, cardTo }: DosirakSectionProps) => (
  <section>
    <SectionTitle title={title} description={description} to={to} />
    <div className={styles.dosirakSection}>
      {boxes.map((box, idx) => (
        <DosirakCard key={idx} image={box.image} tag={box.tag} to={`/${cardTo}/${idx}`} />
      ))}
    </div>
  </section>
);

export default DosirakSection;
