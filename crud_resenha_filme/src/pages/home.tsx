import { FormEvent, useState } from "react";
import Grid from "../ui/components/grid";
import { createReviews, Review, useGetReviews } from "../data/reviews";
import handleNotification from "../data/notification";
import Notification from "../ui/components/notification.tsx";
import Form from "../ui/components/form.tsx";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data= {
        id:0,
        nome: formData.get("nome"),
        resenha: formData.get("resenha"),
        nota: formData.get("nota"),
    };

    const response = await createReviews(data);
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
          <Form onClose={closeModal} onSubmit={handleSubmit}></Form>
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
