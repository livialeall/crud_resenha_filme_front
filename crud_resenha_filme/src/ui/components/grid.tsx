import { FormEvent, useEffect, useState } from "react";
import Pagination from "./pagination.tsx";
import Notification from "./notification.tsx";
import {
  useGetReviews,
  Review,
  deleteReviews,
  updateReviews,
} from "../../data/reviews.tsx";
import Form from "./form.tsx";

const Grid = ({ search,handleNotification,messageNotification,typeNotification}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<Review>();
  const headers = ["Nome do Filme", "Resenha", "Nota", "Ações"];
  const limit = 5;
  const { data, error, loading } = useGetReviews();
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [valueEditing, setValueEditing] = useState("");
  const [nameEditing, setNameEditing] = useState("");

  const searchedData = data.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase().trim())
  );

  const quantity = Math.ceil(
    searchedData.length == 0 ? data.length / limit : searchedData.length / limit
  );

  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationOpen(false); // Altera o estado para esconder o componente
    }, 40000); // 10 segundos em milissegundos (10000ms)

    return () => clearTimeout(timer);
  }, [notificationOpen]);

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
    const response = await deleteReviews(Number(id));
    handleNotification(true)
    setModalConfirmDelete(false);
    closeModal();
    if (response == 200) {
      typeNotification("sucess");
      messageNotification("Resenha deletada com sucesso!")
    } else {
      typeNotification("erro")
      messageNotification("Ocorreu um erro ao deletar sua resenha.")
    }
  };

  /* Esse é para abrir o modal de edição */
  const handleEditButton = (id: string, nome: string) => {
    setValueEditing(id);
    setNameEditing(nome);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNameEditing("");
  };

  const handleSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      id: Number(valueEditing),
      nome: formData.get("nome"),
      resenha: formData.get("resenha"),
      nota: formData.get("nota"),
    };

    const response = await updateReviews(data);
    closeModal();
    handleNotification(true)
    if (response == 200) {
      typeNotification("sucess");
      messageNotification("Sua resenha foi editada com sucesso");
    } else {
      typeNotification("erro");
      messageNotification("Houve um problema para editar sua resenha");
    }
  };

  return (
    <>
      <div className="grid header">
        {headers.map((item) => (
          <div className="justify-center flex g-4" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div>
        {loading && (
          <div className="message-inform">
            Carregando...
          </div>
        )}
        {error && (
          <div className="message-inform">
            Poxa, tivemos um erro para buscar as resenhas.
          </div>
        )}
        {paginatedData &&
          paginatedData.map((item) => (
            <>
              <div className="grid" key={item.id}>
                <div>{item.nome}</div>
                <div>{item.resenha}</div>
                <div>{item.nota}</div>
                <div className="flex justify-center g-12 wrap">
                  <button
                  className="edit-button"
                    value={item.id}
                    onClick={(e) =>
                      handleEditButton(e.currentTarget.value, item.nome)
                    }
                  >
                    Editar
                  </button>
                  <button
                  className="delete-button"
                    value={item.id}
                    onClick={(e) =>
                      handleConfirmDeleteButton(e.currentTarget.value)
                    }
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </>
          ))}
        {isOpen && (
          <Form
            onClose={closeModal}
            onSubmit={handleSubmitEdit}
            initialValue={nameEditing}
          ></Form>
        )}
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
                  className="active"
                >
                  Confirmar
                </button>
                <button onClick={() => setModalConfirmDelete(false)} className="subbutton-hover">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        {searchedData.length > 0 && (error?.message.length == 0 || !loading) ? (
          <div className="flex justify-between align-center">
            <div className="subtext">
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
          <div className="message-inform">
            Não foram encontradas resenhas
          </div>
        )}
      </div>
    </>
  );
};

export default Grid;
