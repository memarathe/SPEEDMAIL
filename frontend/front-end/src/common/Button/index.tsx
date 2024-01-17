import { StyledButton } from "./styles.ts";
import { ButtonProps } from "../types.ts";

export const Button = ({
  color,
  fixedwidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledButton color={color} fixedwidth={fixedwidth} onClick={onClick}>
    {children}
  </StyledButton>
);
