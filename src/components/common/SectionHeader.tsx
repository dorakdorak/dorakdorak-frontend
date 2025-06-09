import styles from "@/css/common/SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return <h3 className={styles.sectionHeading}>{title}</h3>;
};

export default SectionHeader;
