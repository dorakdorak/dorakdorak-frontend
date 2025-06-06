import { ReactNode } from "react";
import "@/css/main/DosirakSection.css";
import SectionTitle from "@/components/main/SectionTitle";
import DosirakCard from "@/components/main/DosirakCard";

const DosirakSection = ({
  title,
  description,
  boxes,
  to,
}: {
  title: string;
  description?: ReactNode;
  boxes: { image: string; tag: string }[];
  to: string;
}) => (
  <section>
    <SectionTitle title={title} description={description} to={to} />
    <div className="dosirak-section">
      {boxes.map((box, idx) => (
        <DosirakCard key={idx} image={box.image} tag={box.tag} />
      ))}
    </div>
  </section>
);

export default DosirakSection;
