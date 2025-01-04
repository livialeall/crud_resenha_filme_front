import { useState, useEffect} from "react";

export interface Review {
  id: number;
  nome: string;
  resenha: string;
  nota: number;
}

export const useGetReviews = () => {
  const [data, setData] = useState<Review[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const usingMock = false;
  useEffect(() => {
      const fetchData = async () => {
        try {
          let response;
          if (!usingMock) {
            response = await fetch("http://127.0.0.1:8000/read_review/");
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

export const deleteReviews = async (id: number) => {
      try{
        const response = await fetch(`http://127.0.0.1:8000/delete_review/${id}`,
          {method: "DELETE"}
        )
        if(!response.ok){
          throw new Error()
        }
        return response.status
      }
      catch(error){
        console.log(error)
        return error
      }
}
    
export const createReviews = async (review: { id: number ;nome: FormDataEntryValue | null; resenha: FormDataEntryValue | null; nota: FormDataEntryValue | null;}) => {
  try{
    const response = await fetch(`http://127.0.0.1:8000/create_review`,
      {method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
    if(!response.ok){
      throw new Error()
    }
    return response.status
  }
  catch(error){
    console.log(error)
    return error
  }
}