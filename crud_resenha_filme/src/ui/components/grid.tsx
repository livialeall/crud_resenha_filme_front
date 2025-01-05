import { FormEvent, useEffect, useState } from "react";
import Pagination from "./pagination.tsx";
import Notification from "./notification.tsx";
import { useGetReviews, Review, deleteReviews, updateReviews } from "../../data/reviews.tsx";
import handleNotification from "../../data/notification.tsx";
import Form from "./form.tsx";

const Grid = ({ search }: { search: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<Review>();
  const headers = ["Nome do Filme", "Resenha", "Nota", "Ações"];
  const limit = 5;
  const { data, error, loading } = useGetReviews();
  const [messageNotification, setNotificationMessage] = useState("");
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [valueEditing,setValueEditing] = useState("")
  const [nameEditing,setNameEditing] = useState("")

  const searchedData = data.filter((item) =>
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

  const handleConfirmDeleteButton = (id: string) => {
    console.log(id);
    const teste = data.filter((item) => item.id.toString() == id);
    setItemToBeDeleted(teste[0]);
    setModalConfirmDelete(true);
  };

  const handleDeleteButton = async (id: string) => {
    console.log(id);
    const response = await deleteReviews(Number(id));
    console.log(response);
    setModalConfirmDelete(false);
    useGetReviews();
    if (response == 200) {
      setNotificationMessage("Mensagem deletada com sucesso!");
      useGetReviews();
    } else {
      console.log(response);
      setNotificationMessage("Ocorreu um erro ao deletar sua mensagem.");
    }
    handleNotification();
    setModalConfirmDelete(false);
  };

  const handleEditButton = (id:string,nome:string) => {
    setValueEditing(id)
    setNameEditing(nome)
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false);
    setNameEditing("")
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
  
      const data= {
          id:Number(valueEditing),
          nome: formData.get("nome"),
          resenha: formData.get("resenha"),
          nota: formData.get("nota"),
      };
  
      const response = await updateReviews(data);
      setNameEditing("")
  }
  
  return (
    <>
      <div className="grid-header">
        {headers.map((item) => (
          <div className="justify-center flex g-4" key={item}>
            {item}
          </div>
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
          paginatedData.map((item) => (
            <div className="grid">
              <div className="grid-item" key={item.id}>
                <div>{item.nome}</div>
                <div>{item.resenha}</div>
                <div>{item.nota}</div>
              </div>
              <div className="flex justify-center g-12 ">
                <button value={item.id} onClick={(e) => handleEditButton(e.currentTarget.value,item.nome)}>
                  Editar
                </button>
                <button
                  value={item.id}
                  onClick={(e) =>
                    handleConfirmDeleteButton(e.currentTarget.value)
                  }
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        {isOpen && <Form onClose={closeModal} onSubmit={handleSubmit} initialValue={nameEditing}></Form>}
        {modalConfirmDelete && (
          <div className="modal-overlay">
            <div className="modal-container">
              <span>
                Tem certeza que quer deletar a resenha do filme:
                {itemToBeDeleted?.nome}
              </span>
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
        {searchedData.length > 0 && (error?.message.length == 0 || !loading) ? (
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
        ) : loading || error?.message ? null : (
          <div className="justify-center align-center font-size-18">
            Não foram encontradas resenhas
          </div>
        )}
        {notificationOpen && (
          <Notification message={messageNotification}></Notification>
        )}
      </div>
    </>
  );
};

export default Grid;
