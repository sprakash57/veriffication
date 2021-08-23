/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { CheckItem } from "../../helpers/api";
import { useKeyNavigation } from "../../helpers/hooks";
import { classnames } from "../../helpers/utils";
import Button from "../../components/Button";
import styles from './Check.module.css';

type Props = {
    item: CheckItem;
    active: boolean;
    updateChecks: (item: number, btnStatus: string) => void;
    index: number;
}

const Check = ({ item, active, updateChecks, index }: Props) => {
    const [option, setOption] = useState("");
    const [hover, setHover] = useState(false);
    const pressYes = useKeyNavigation("1");
    const pressNo = useKeyNavigation("2");
    const updateCheckList = useCallback((option: string) => {
        setOption(option);
        updateChecks(index, option);
    }, [index, updateChecks])

    useEffect(() => {
        if (active && pressYes) {
            updateCheckList("yes");
        }
    }, [pressYes, active]);

    useEffect(() => {
        if (active && pressNo) {
            updateCheckList("no");
        }
    }, [pressNo, active]);

    const handleYes = () => {
        updateCheckList("yes");
    };

    const handleNo = () => {
        updateCheckList("no");
    };

    return (
        <article
            className={classnames(
                styles.item,
                active && styles.active,
                (item.isActionable || index === 0) && styles.item__noOpacity, // First item will be active by default
                hover && styles.hover
            )}
            onMouseEnter={() => item.isActionable && setHover(true)}
            onMouseLeave={() => item.isActionable && setHover(false)}
        >
            <p className={styles.item__description}>{item.description}</p>
            <Button
                onClick={handleYes}
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
                onClick={handleNo}
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
