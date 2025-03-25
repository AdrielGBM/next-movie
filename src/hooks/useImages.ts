import { useState, useEffect } from "react";
import get from "../services/get";
import { Images } from "../types/media";

function useImages(path: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Images | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await get<Images>(
          "/3" + path + "/images?include_image_language=es,en,null"
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

export default useImages;
