import { StyledContainer } from "./styles.ts";
import { ContainerProps } from "../types.ts";

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
