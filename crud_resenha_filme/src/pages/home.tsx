import { useState } from "react";
import Grid from "../ui/components/grid";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="main-div shadow rounded-10">
      <div className="flex g-24">
        <h1>Resenha de Filmes</h1>
        <button onClick={openModal}>ADICIONAR RESENHA</button>
        {isOpen && (
          <div>
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-container">
                Grid do Modal
                <button onClick={closeModal}>Fecha</button>
                <button onClick={closeModal}>Confirma</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Grid></Grid>
    </div>
  );
};

export default Home;
