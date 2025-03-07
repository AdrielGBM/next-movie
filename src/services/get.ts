const token = import.meta.env.VITE_API_TOKEN;

async function get<Data>(path: string): Promise<Data> {
  const URL = `https://api.themoviedb.org${path}`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error ${String(response.status)}: No se pudo obtener los datos`
      );
    }

    return (await response.json()) as Data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
}

export default get;
