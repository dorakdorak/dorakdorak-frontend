import "@/css/common/SectionHeader.css";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return <h3 className="section-heading">{title}</h3>;
};

export default SectionHeader;
