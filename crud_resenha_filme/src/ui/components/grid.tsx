import { useCallback, useEffect, useMemo, useState } from "react";
import useGetReviews, { Review } from "../../data/reviews.tsx";
import Pagination from "./pagination.tsx";

const Grid = ({ search }: { search: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const headers = ["Nome do Filme", "Resenha", "Nota", "Ações"];
  const limit = 5;
  const { data, error, loading } = useGetReviews();

  const searchedData = data.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase().trim())
  );

  const quantity = Math.ceil( searchedData.length == 0 ? data.length / limit : searchedData.length / limit);

  useEffect(() =>{
    setPageNumber(1)
  },[search])

  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData =  searchedData.slice(startIndex, endIndex);

  const pagesList = [];
  for (let index = 1; index <= quantity; index++) {
    pagesList.push(index);
  }

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
        {paginatedData &&
          paginatedData.map((item, index) => (
            <div className="grid">
              <div>{item.nome}</div>
              <div>{item.resenha}</div>
              <div>{item.nota}</div>
              <div className="flex justify-center g-12 ">
                <button>Editar</button>
                <button>Deletar</button>
              </div>
            </div>
          ))}
        {searchedData.length > 0 ? (
          <div className="flex justify-between align-center">
            <div>
              Mostrando {paginatedData.length} de {searchedData.length} avaliações
            </div>
            <Pagination
              pagesList={pagesList}
              selectedPageNumber={pageNumber}
              onPageChange={setPageNumber}
            ></Pagination>
          </div>
        ) : 
        <div className="justify-center align-center font-size-18">
            Não foram encontradas resenhas
          </div>
        }
      </div>
    </>
  );
};

export default Grid;
