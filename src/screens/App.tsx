import { useEffect, useState } from 'react';
import Check from '../components/Check';
import { CheckItem, fetchChecks } from '../helpers/api';
import './styles/screens/App.modules.css';

const App = () => {
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const updateChecks = (index: number, option: string) => {
    let newChecks: CheckItem[] = [];
    if (option === "no") {
      newChecks = checks.map((check, i) => {
        if (i > index) return { ...check, isActionable: false };
        return { ...check, isActionable: true };
      });
    } else {
      newChecks = checks.map(check => {
        if (checks[index + 1] && check === checks[index + 1]) {
          return { ...check, isActionable: true }
        }
        return check;
      });
    }
    setChecks(newChecks);
  }

  // Get the checklist at initial mount.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {!!checks.length && checks.map((item, i) => (
        <Check
          key={item.id}
          index={i}
          item={item}
          updateChecks={updateChecks}
        />
      ))}
    </main>
  );
}

export default App;
