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
      <div className="g-24 component-div">
        <div className="g-24 align-center">
            <h1>Resenha de Filmes</h1>
            <button onClick={openModal}>ADICIONAR RESENHA</button>
        </div>
        <Grid></Grid>
        {isOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-container">
              Grid do Modal
              <button onClick={closeModal}>Fecha</button>
              <button onClick={closeModal}>Confirma</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Home;
