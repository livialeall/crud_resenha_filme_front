import Buttons from "./buttons/generic"

const Modal = ({open} : {open:true}) => {
    return (
        <>
        {open && (
            <div className="modal-overlay">
                <div className="modal-container">
                    Teste
                    <Buttons nome={"Fechar"}>
                        
                    </Buttons>
                </div>
            </div>
        )}
        </>
    )
}

export default Modal