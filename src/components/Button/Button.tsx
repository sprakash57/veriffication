import React from "react";
import { classnames } from "../../helpers/utils";
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({ children, className, ...rest }: Props) => {
    return (
        <button
            className={classnames(styles.button, className)}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
