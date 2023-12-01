import styles from "./Tag.modules.css";
import { TagVariants, TagProps } from "./Tag.definitions";

const Tag = ({
    variant,
    textSize,
}: TagProps) => {
    return (
        <div className={`${styles.tag} ${styles[variant]} ${styles[textSize]}`}>
            {text}
        </div>
    );
};


export default Tag;
