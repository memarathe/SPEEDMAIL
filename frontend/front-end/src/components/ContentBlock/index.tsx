import LeftContentBlock from "./LeftContentBlock/index.tsx";
import RightContentBlock from "./RightContentBlock/index.tsx";
import { ContentBlockProps } from "./types";

const ContentBlock = (props: ContentBlockProps) => {
  if (props.type === "left") return <LeftContentBlock {...props} />;
  if (props.type === "right") return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
