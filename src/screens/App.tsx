import { useEffect, useState } from 'react';
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
  // Get the checklist at initial mount.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      Veriffication
      {JSON.stringify(checks)}
    </div>
  );
}

export default App;
