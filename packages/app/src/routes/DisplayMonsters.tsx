import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function DisplayMonsters() {
  useEffect(() => {
    fetch(BACKEND_URL);
  }, []);

  return <div>DisplayMonsters</div>;
}
