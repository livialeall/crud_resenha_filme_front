import { useEffect, useState } from "react";
import useGetReviews, { Review } from "../../data/reviews.tsx";
import Pagination from "./pagination.tsx";
import Notification from "./notification.tsx";

const Grid = ({ search }: { search: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<Review>();
  const headers = ["Nome do Filme", "Resenha", "Nota", "Ações"];
  const [notificationOpen,setNotificationOpen] = useState(false)
  const limit = 5;
  const { data, error, loading } = useGetReviews();
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const cleanedData = data.filter(
    (item) => !deletedItems.includes(item.id.toString())
  );
  console.log(cleanedData);
  const searchedData = cleanedData.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase().trim())
  );

  const quantity = Math.ceil(
    searchedData.length == 0 ? data.length / limit : searchedData.length / limit
  );

  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = searchedData.slice(startIndex, endIndex);

  const pagesList = [];
  for (let index = 1; index <= quantity; index++) {
    pagesList.push(index);
  }

  const handleConfirmDeleteButton = (id:string) => {
    console.log("Clicou para abrir")
    console.log(id);
    const teste = data.filter((item) => item.id.toString() == id);
    setItemToBeDeleted(teste[0])
    setModalConfirmDelete(true)
  };

  const handleDeleteButton = (id: string) => {
    setDeletedItems((prev) => [...prev, id]);
    setModalConfirmDelete(false)

    const handleNotification = () => {
      setNotificationOpen(true)
      setTimeout(() => {
        setNotificationOpen(false);
      }, 3000);
    }
    handleNotification()
  };

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
              <div className="grid-item" key={item.id}>
                <div>{item.nome}</div>
                <div>{item.resenha}</div>
                <div>{item.nota}</div>
              </div>
              <div className="flex justify-center g-12 ">
                <button>Editar</button>
                <button value={item.id} onClick={(e) => handleConfirmDeleteButton(e.currentTarget.value)}>
                  Deletar
                </button>
              </div>
            </div>
          ))}
          {modalConfirmDelete && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <span>Tem certeza que quer deletar a resenha do filme: {itemToBeDeleted?.nome}</span>
                    <div className="flex justify-center g-12 m-top-4">
                      <button
                        value={itemToBeDeleted?.id}
                        onClick={(e) => handleDeleteButton(e.currentTarget.value)}
                      >
                        Confirmar
                      </button>
                      <button onClick={() => setModalConfirmDelete(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
        {searchedData.length > 0 ? (
          <div className="flex justify-between align-center">
            <div>
              Mostrando {paginatedData.length} de {searchedData.length}{" "}
              avaliações
            </div>
            <Pagination
              pagesList={pagesList}
              selectedPageNumber={pageNumber}
              onPageChange={setPageNumber}
            ></Pagination>
          </div>
        ) : (
          <div className="justify-center align-center font-size-18">
            Não foram encontradas resenhas
          </div>
        )}
        {notificationOpen &&
          <Notification message={"Resenha deletada com sucesso!"} ></Notification>
        }
      </div>
    </>
  );
};

export default Grid;
