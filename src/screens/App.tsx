import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Check from '../components/Check';
import { CheckItem, fetchChecks } from '../helpers/api';
import { useKeyNavigation } from '../helpers/hooks';
import styles from '../styles/screens/App.module.css';

const App = () => {
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [lastActive, setLastActive] = useState(0);

  const downPress = useKeyNavigation("ArrowDown");
  const upPress = useKeyNavigation("ArrowUp");

  const fetchData = async () => {
    try {
      setLoading(true);
      const checks = await fetchChecks();
      checks.sort((prev, next) => prev.priority - next.priority);
      setChecks(checks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Hmm... Something is not right!! Try refreshing the page.");
    }
  }

  const showSuccess = () => {
    setSuccess(true);
    setError("");
  }

  const updateChecks = (index: number, option: string) => {
    let newChecks: CheckItem[] = [];
    if (option === "no") {
      setLastActive(index);
      newChecks = checks.map((check, i) => {
        if (i > index) return { ...check, isActionable: false };
        return { ...check, isActionable: true };
      });
    } else {
      setLastActive(index + 1);
      newChecks = checks.map(check => {
        if (checks[index + 1] && check === checks[index + 1]) {
          return { ...check, isActionable: true }
        }
        return check;
      });
    }
    setDisableSubmit(!(index === checks.length - 1 || option === "no"));
    setChecks(newChecks);
  }

  // Get the checklist at initial mount.
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (checks.length && downPress && lastActive > 0) {
      setCursor((prevState) =>
        (prevState < lastActive) ? prevState + 1 : prevState
      );
    }
  }, [downPress, checks, lastActive]);

  useEffect(() => {
    if (checks.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, checks]);

  return (
    <main className={styles.container}>
      {!!checks.length && checks.map((item, i) => (
        <Check
          key={item.id}
          index={i}
          item={item}
          active={i === cursor}
          updateChecks={updateChecks}
        />
      ))}
      <section className={styles.submit}>
        <Button
          disabled={disableSubmit}
          className={styles.submit__btn}
          onClick={showSuccess}
        >
          Submit
        </Button>
      </section>
    </main>
  );
}

export default App;
