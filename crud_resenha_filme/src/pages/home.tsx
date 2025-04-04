import { FormEvent, useEffect, useState } from "react";
import Grid from "../ui/components/grid";
import { createReviews } from "../data/reviews";
import Notification from "../ui/components/notification.tsx";
import Form from "../ui/components/form.tsx";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [messageNotification, setNotificationMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [typeNotification, setNotificationType] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
          const timer = setTimeout(() => {
            setNotificationOpen(false); // Altera o estado para esconder o componente
          }, 4000); // 10 segundos em milissegundos (10000ms)
      
          return () => clearTimeout(timer);
        }, [notificationOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      id: 0,
      nome: formData.get("nome"),
      resenha: formData.get("resenha"),
      nota: formData.get("nota"),
    };

    const response = await createReviews(data);
    closeModal()
    setNotificationOpen(true)
    if (response == 200) {
      setNotificationType("sucess");
      setNotificationMessage("Sua resenha foi criada com sucesso");
    } else {
      setNotificationType("erro");
      setNotificationMessage("Houve um problema para criar sua resenha");
    }
  };

  return (
    <>
    <div className="flex align-center g-6 m-top-12">
      <h1 className="align-self-end">sua resenha</h1>
      <div className="circle align-self-end"></div>
    </div>
    <div className="g-24 component-div">
      <div className="g-24 align-stretch m-6">
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
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <Grid search={searchItem} handleNotification={setNotificationOpen} messageNotification={setNotificationMessage} typeNotification={setNotificationType}></Grid>
      {isOpen && (
        <Form
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialValue={""}
        ></Form>
      )}
    </div>
    {notificationOpen && (
      <Notification
        message={messageNotification}
        type={typeNotification}
      ></Notification>
    )}
    </>
  );
};

export default Home;
