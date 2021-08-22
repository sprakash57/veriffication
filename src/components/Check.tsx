/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CheckItem } from "../helpers/api";
import { useKeyNavigation } from "../helpers/hooks";
import { classnames } from "../helpers/utils";
import styles from '../styles/components/Check.module.css';
import Button from "./Button";

type Props = {
    item: CheckItem;
    active?: boolean;
    updateChecks: (item: number, btnStatus: string) => void;
    index: number;
}

const Check = ({ item, active = false, updateChecks, index }: Props) => {
    const [option, setOption] = useState("");
    const [hover, setHover] = useState(false);
    const leftPress = useKeyNavigation("1");
    const rightPress = useKeyNavigation("2");

    useEffect(() => {
        if (active && leftPress) {
            setOption("yes");
            updateChecks(index, "yes");
        }
    }, [leftPress, active, index]);

    useEffect(() => {
        if (active && rightPress) {
            setOption("no");
            updateChecks(index, "no");
        }
    }, [rightPress, active, index]);

    const handleOne = () => {
        if (active) {
            setOption("yes");
            updateChecks(index, "yes");
        }
    };

    const handleTwo = () => {
        if (active) {
            setOption("no");
            updateChecks(index, "no");
        }
    };

    return (
        <article
            className={classnames(
                styles.item, active && styles.active,
                (item.isActionable || index === 0) && styles.item__noOpacity,
                hover && styles.hover
            )}
            onMouseEnter={() => item.isActionable && setHover(true)}
            onMouseLeave={() => item.isActionable && setHover(false)}
        >
            <p className={styles.item__description}>{item.description}</p>
            <Button
                onClick={handleOne}
                disabled={!item.isActionable && index !== 0}
                className={classnames(
                    styles.btn,
                    styles.btn__yes,
                    option === "yes" && styles.btn__active
                )}
            >
                Yes
            </Button>
            <Button
                onClick={handleTwo}
                disabled={!item.isActionable && index !== 0}
                className={classnames(
                    styles.btn,
                    styles.btn__no,
                    option === "no" && styles.btn__active
                )}
            >
                No
            </Button>
        </article>
    );
};

export default Check;
