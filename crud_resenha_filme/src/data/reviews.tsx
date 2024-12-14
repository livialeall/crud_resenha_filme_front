import { useState, useEffect, useContext,createContext } from "react";

export interface Review {
  id: number;
  nome: string;
  resenha: string;
  nota: number;
}

const useGetReviews = () => {
  const [data, setData] = useState<Review[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const usingMock = true;
  useEffect(() => {
      const fetchData = async () => {
        try {
          let response;
          if (!usingMock) {
            response = await fetch("");
          } else { 
            response = await fetch('src/mocks/resenhas.json');
          }
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
          }
          const json = await response.json();
          setData(json);
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
            console.error("Erro", error.message);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
   
  }, []);

  return { data, error, loading };
};

export default useGetReviews;
