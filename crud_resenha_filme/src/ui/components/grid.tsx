import Buttons from "./buttons/generic"


const Grid = () =>{
    return(
        <div className="subcomponent-div">
            {/* Colunas */}
            <div>Nome do filme</div>
            <div>Resenha</div>
            <div>Nota</div>
            {/* para cada um */}
            <Buttons nome={"Editar"}></Buttons>
            <Buttons nome={"Deletar"}></Buttons>
        </div>
    )
}

export default Grid