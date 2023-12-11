import type { FC } from "react";

interface IconProps {
  glyph: string;
  regular?: boolean;
  size?: string;
}

const Icon: FC<IconProps> = ({ glyph, regular = false, size = "" }) => {
  const iconClass = `fa${regular ? "r" : "s"} fa-${glyph}`;

  return (
    <i
      className={`Icon ${iconClass} Text-fontSize--${size !== "" ? size : ""}`}
    />
  );
};

export default Icon;
