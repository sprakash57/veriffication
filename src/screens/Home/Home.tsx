import { useEffect, useState } from 'react';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Check from '../../components/Check';
import Loader from '../../components/Loader';
import { CheckItem, fetchChecks, submitCheckResults } from '../../helpers/api';
import { useKeyNavigation } from '../../helpers/hooks';
import styles from './Home.module.css';

const Home = () => {
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [alert, setAlert] = useState<{ body: string, action: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [cursor, setCursor] = useState(0); // Current position of navigation
  const [lastActive, setLastActive] = useState(0); // last active check item index in the list
  // Track up and down navigation
  const downPress = useKeyNavigation("ArrowDown");
  const upPress = useKeyNavigation("ArrowUp");

  const fetchData = async () => {
    try {
      setLoading(true);
      const checks = await fetchChecks();
      checks.sort((prev, next) => prev.priority - next.priority);
      setChecks(checks);
      setAlert(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ body: "Hmm... Something is not right!! Try refreshing the page.", action: "Reload" });
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const hasSubmitted = await submitCheckResults(checks);
      if (hasSubmitted?.length) {
        setAlert({ body: "Great!! All checks are submitted.", action: "Next" });
      } else {
        setAlert({ body: "Sad!! No Checks are sent to server.", action: "Reload" })
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert({ body: "Whoa!! Last submission failed. Try again.", action: "Retry" })
    }
  }

  const updateChecks = (index: number, option: string) => {
    setChecks((checks) => {
      let newChecks: CheckItem[] = [...checks];
      newChecks[index].answer = option;
      const firstNoIndex = newChecks.findIndex(check => check.answer === "no");
      const hasNo = firstNoIndex !== -1;
      newChecks = newChecks.map((check, i) => {
        if (i > firstNoIndex && hasNo) return { ...check, isActionable: false }
        if (i === index + 1) return { ...check, isActionable: true }
        if (i > index + 1) {
          if (check.answer) return { ...check, isActionable: true }
          return { ...check, isActionable: false }
        }
        return { ...check, isActionable: true };
      });
      if (hasNo) setLastActive(firstNoIndex);
      else setLastActive(index + 1);
      setDisableSubmit(!(newChecks.every(check => check.answer) || hasNo));
      return newChecks;
    });
  }
  // Get the checklist at initial mount.
  useEffect(() => {
    fetchData();
  }, []);
  // Track the down navigation. So that it not should not go beyond last active check item
  useEffect(() => {
    if (checks.length && downPress && lastActive > 0) {
      setCursor((prevState) => {
        let limitToNavigate = lastActive;
        if (checks.every(check => check.isActionable)) limitToNavigate = checks.length - 1;
        return (prevState < limitToNavigate) ? prevState + 1 : prevState;
      });
    }
  }, [downPress, checks, lastActive]);

  useEffect(() => {
    if (checks.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, checks]);

  if (loading) return <Loader />

  if (alert) {
    return <Alert message={alert} clickCallback={fetchData} />
  }

  return (
    <main className={styles.container}>
      {!!checks.length && (
        <>
          {checks.map((item, i) => (
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </section>
        </>
      )}
    </main>
  );
}

export default Home;
