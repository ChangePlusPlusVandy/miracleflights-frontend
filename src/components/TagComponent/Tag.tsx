import styles from "./Tag.modules.css";
import { TagProps } from "./Tag.definitions";

const Tag = ({
    variant, // 'small', 'normal', 'large'
    color, // 'green', 'yellow', 'red', 'blue', 'gray'
    text,
}: TagProps) => {
    return (
        <div className={`${styles.tag} ${styles[variant]} ${styles[color]}`}>
            {text}
        </div>
    );
};

export default Tag;
