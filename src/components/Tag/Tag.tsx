import styles from "./Tag.module.css";
import { TagVariant, type TagProps, TagColor } from "./Tag.definitions";

const Tag = ({
  variant = TagVariant.NORMAL,
  color = TagColor.GREY,
  text,
}: TagProps) => {
  return (
    <div className={`${styles.tag} ${styles[variant]} ${styles[color]}`}>
      {text}
    </div>
  );
};

export default Tag;
