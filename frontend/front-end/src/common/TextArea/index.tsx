import { withTranslation } from "react-i18next";
import { StyledTextArea, StyledContainer, Label } from "./styles.tsx";
import { InputProps } from "../types.ts";

const TextArea = ({ name, placeholder, onChange, t }: InputProps) => (
  <StyledContainer>
    <Label htmlFor={name}>{t(name)}</Label>
    <StyledTextArea
      placeholder={t(placeholder)}
      id={name}
      name={name}
      onChange={onChange}
    />
  </StyledContainer>
);

export default withTranslation()(TextArea);
