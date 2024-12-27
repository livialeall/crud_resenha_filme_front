import { FormEvent, useState } from "react";
import Grid from "../ui/components/grid";
import { createReviews, Review, useGetReviews } from "../data/reviews";
import handleNotification from "../data/notification";
import Notification from "../ui/components/notification.tsx";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [messageNotification,setNotificationMessage] = useState("");
  const [notificationOpen,setNotificationOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data= {
      nome: formData.get("nome"),
      resenha: formData.get("resenha"),
      nota: formData.get("nota"),
    };
    console.log(name)

    const response = await createReviews(data);
    if(response == 200){
      setNotificationMessage("Resenhac criada com sucesso!")
      useGetReviews();
    }else{
      console.log(response)
      setNotificationMessage("Ocorreu um erro ao inserir sua resenha.")
    }
    closeModal()
    setNotificationOpen(handleNotification())
  }

  return (
      <div className="g-24 component-div">
        <div className="g-24 align-center">
          <h1>Resenha de Filmes</h1>
          <button onClick={openModal} className="rounded-3 shadow-lighter active">
            Adicionar resenha
          </button>
          <input
            type="search"
            name=""
            id=""
            placeholder="Procure um filme"
            className="p-10 rounded-3 shadow-lighter"
            value={searchItem}
            onChange={(e)=> setSearchItem(e.target.value)}
          />
        </div>
        <Grid search={searchItem}></Grid>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              Adicione sua resenha
              <form action="POST" className="flex-column ">
                <label>
                  Filme:
                  <input type="text" />
                </label>
                <label>
                  Sua Resenha:
                  <input type="text" />
                </label>
                <label>
                  Sua nota:
                  <input type="text" />
                </label>
                <div className="flex g-12">
                  <button
                    onSubmit={(e) => handleSubmit(e)}
                    className="rounded-3 shadow-lighter"
                  >
                    Confirma
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded-3 shadow-lighter"
                  >
                    Fechar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {notificationOpen && (
          <Notification
            message={messageNotification}
          ></Notification>
        )}
      </div>
  );
};

export default Home;
