import { classnames } from '../../helpers/utils';
import styles from './Loader.module.css';

type Props = {
    className?: string;
    label?: string;
    labelClassName?: string;
}

const Loader = ({ className = "", label = "Loading...", labelClassName = "" }: Props) => {
    return (
        <section className={classnames(styles.container, className)}>
            <div
                className={styles.loader}
                role="status"
            />
            <span className={classnames(styles.label, labelClassName)}>{label}</span>
        </section>
    )
}

export default Loader;
