import { useState } from "react";
import Grid from "../ui/components/grid";
import Footer from "../ui/components/pagination";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

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
          <button onClick={openModal} className="rounded-3 shadow-lighter">
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
                    onClick={closeModal}
                    className="rounded-3 shadow-lighter"
                  >
                    Fecha
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded-3 shadow-lighter"
                  >
                    Confirma
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

export default Home;
