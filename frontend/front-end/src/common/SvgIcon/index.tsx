import { SvgIconProps } from "../types.ts";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  // <img src={require("./gvs.jpg")} width={100} height={100} />
  <img src={`/img/svg/${src}`} alt={src} width={width} height={height} />
);
