const Form = ({onClose,onSubmit}) =>{

return (
    <div className="modal-overlay">
            <div className="modal-container form">
              <h2>Adicione sua resenha</h2>
              <form action="POST" className="flex-column" onSubmit={onSubmit}>
                <label>
                  Filme:
                  <input type="text" name="nome"/>
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
                  <button
                    type="submit"
                    className="rounded-3 shadow-lighter"
                  >
                    Confirma
                  </button>
                  <button
                    className="rounded-3 shadow-lighter"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                </div>
              </form>
            </div>
          </div>
)
}

export default Form