import { useEffect, useState } from "react";

const useKeyNavigation = (targetKey: string) => {
    const [hasPressed, setHasPressed] = useState(false);

    const handleKeydown = ({ key }: { key: string }) => {
        if (key === targetKey) {
            setHasPressed(true);
        }
    }

    const handleKeyup = ({ key }: { key: string }) => {
        if (key === targetKey) {
            setHasPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("keyup", handleKeyup);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("keyup", handleKeyup);
        };
    });

    return hasPressed;
};

export default useKeyNavigation;
