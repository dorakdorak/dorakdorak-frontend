import "@/css/common/Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gray";
  size?: "sm" | "md" | "lg"; // 크기
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
  const classNames = ["btn", `btn-${variant}`, `btn-${size}`, fullWidth ? "btn-full" : ""].join(
    " "
  );

  return (
    <button className={classNames} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
