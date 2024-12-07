import useGetReviews from "../../data/reviews.tsx";

const Grid = ({search} : {search:string}) => {
  const { data, error, loading } = useGetReviews();
  

  return (
    <>
      <div className="grid-header">
        <div>#</div>
        <div>Nome do filme</div>
        <div>Resenha</div>
        <div>Nota</div>
        <div>Ações</div>
      </div>
      <div>
        {/* Colunas */}
        {loading && <div className="justify-center align-center font-size-18">Carregando...</div>}
        {error && <div className="justify-center align-center font-size-18">Poxa, tivemos um erro para buscar as resenhas.</div>}
        {data &&
          data
          .filter((item)=> item.nome.toLowerCase().includes(search))
          .map((item, index) => (
            <div className="grid">
              <div>{index + 1}</div>
              <div>{item.nome}</div>
              <div>{item.resenha}</div>
              <div>{item.nota}</div>
              <div className="flex justify-center g-12 ">
                <button className="rounded-3 shadow-lighter">Editar</button>
                <button className="rounded-3 shadow-lighter">Deletar</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Grid;
