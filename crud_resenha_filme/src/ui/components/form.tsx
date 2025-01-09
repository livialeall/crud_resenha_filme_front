import { useState } from "react";

const Form = ({ onClose, onSubmit, initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleChange = (event: { target: { value: any; }; }) => {
    setInputValue(event.target.value); // Atualiza o estado com o valor do campo
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container form">
        <h2>Adicione sua resenha</h2>
        <form action="POST" className="flex-column" onSubmit={onSubmit}>
          <label>
            Filme:
            <input
              type="text"
              name="nome"
              value={inputValue}
              onChange={handleChange}
            />
          </label>
          <label>
            Sua Resenha:
            <input type="text" name="resenha" />
          </label>
          <label>
            Sua nota:
            <input type="text" name="nota" />
          </label>
          <div className="flex g-12">
            <button type="submit" className="rounded-3 active">
              Confirma
            </button>
            <button className="rounded-3 shadow-lighter subbutton-hover" onClick={onClose}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
