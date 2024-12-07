import useGetReviews from "../../data/reviews.tsx";

const Grid = () => {
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
      <div className="grid-review">
        {/* Colunas */}
        {loading && <div>Carregando</div>}
        {error && <div>Tivemos ume erro</div>}
        {data &&
          data.map((item, index) => (
            <>
              <div>{index + 1}</div>
              <div>{item.nome}</div>
              <div>{item.resenha}</div>
              <div>{item.nota}</div>
              <div className="flex justify-center g-6 ">
                <button className="rounded-3">Editar</button>
                <button className="rounded-3">Deletar</button>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Grid;
