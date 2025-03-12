import { useState, useEffect } from "react";
import get from "../services/get";
import { Results } from "../types/media";

function useResults<Data>(path: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Results<Data> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await get<Results<Data>>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-MX"
        );
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    void getData();
  }, [path]);

  return { loading, data, error };
}

export default useResults;
