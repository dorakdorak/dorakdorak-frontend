import styles from "@/css/common/Button.module.css";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gray";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const className = classNames(
    styles.btn,
    styles[`btn${capitalize(size)}`],
    styles[`btn${capitalize(variant)}`],
    fullWidth && styles.btnFull
  );

  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default Button;
