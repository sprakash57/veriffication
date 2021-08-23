import styles from './Alert.module.css';
import Button from '../Button';

type Props = {
    message: { body: string, action: string };
    clickCallback?: VoidFunction;
}

const Alert = ({ message, clickCallback }: Props) => {
    return (
        <section className={styles.alert}>
            <summary className={styles.alert__message}>{message.body}</summary>
            <Button
                className={styles.alert__button}
                onClick={clickCallback}
            >
                {message.action}
            </Button>
        </section>
    )
}

export default Alert;
