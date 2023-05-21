import {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from "./myListItem.module.css";

interface Props {
    to: string;
    className?: string;
    title: string;
}

export const MyListItem: FC<Props> = ({title, to, className = ''}) => {
    return (
        <NavLink className={
            ({isActive}) =>
                isActive
                    ? `${className} ${styles.listItem} ${styles.active}`
                    : `${className} ${styles.listItem} `
        }
                 to={to}
        >
            {title}
        </NavLink>
    )
}