import { useState } from "react"
import Modal from "../modal";

const CreateButton = ({nome}:{nome:string}) => {
    const [isOpen,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true)
    }

    return(
        <div>
            <button onClick={openModal} className="">
                {nome}
            </button>
            {isOpen && (
                <Modal open={isOpen}></Modal>
            )}
        </div>
    )
}

export default CreateButton