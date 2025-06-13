import SelectableItem from "@/components/common/select/SelectableItem";
import styles from "@/css/common/SelectableItem.module.css";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function SelectBox({ title, options, selectedValue, onChange }: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {options.map((option) => (
        <SelectableItem
          key={option.value}
          label={option.label}
          selected={selectedValue === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
