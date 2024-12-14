import { useCallback, useMemo, useState } from "react";
import useGetReviews, { Review } from "../../data/reviews.tsx";
import Pagination from "./pagination.tsx";

const Grid = ({ search }: { search: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const headers = ["#", "Nome do Filme", "Resenha", "Nota", "Ações"];
  const limit = 5;
  const {data,error,loading} = useGetReviews();
  const shownLength = Math.ceil(data?.length / limit);

  const pagesList = [];
  for (let index = 1; index <= shownLength; index++) {
    pagesList.push(index);
  }

  const searchedData = data.filter((item) => item.nome.toLowerCase().includes(search.trim()))
  console.log(data);

  return (
    <>
      <div className="grid-header">
        {headers.map((item) => (
          <div className="justify-center flex g-4">{item}</div>
        ))}
      </div>
      <div>
        {loading && (
          <div className="justify-center align-center font-size-18">
            Carregando...
          </div>
        )}
        {error && (
          <div className="justify-center align-center font-size-18">
            Poxa, tivemos um erro para buscar as resenhas.
          </div>
        )}
        {data &&
          searchedData
          .slice((pageNumber - 1) * limit, pageNumber * limit)
            .map((item, index) => (
              <div className="grid">
                <div>{item.id} </div>
                <div>{item.nome}</div>
                <div>{item.resenha}</div>
                <div>{item.nota}</div>
                <div className="flex justify-center g-12 ">
                  <button>Editar</button>
                  <button>Deletar</button>
                </div>
              </div>
            ))}
        {data ? (
          <div className="flex justify-between align-center">
            <div>
              Mostrando {limit} de {data.length} avaliações
            </div>
            <Pagination pagesList={pagesList} selectedPageNumber={pageNumber} onPageChange= {setPageNumber}></Pagination>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Grid;
