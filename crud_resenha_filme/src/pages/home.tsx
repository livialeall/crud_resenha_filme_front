import CreateButton from "../ui/components/buttons/create"
import Grid from "../ui/components/grid"

const Home = () =>(
    <div className="main-div shadow rounded-10">
        <div className="flex g-24">
            <h1>Resenha de Filmes</h1>
            <CreateButton nome={"Adicione uma resenha"}></CreateButton>
        </div>
        <Grid></Grid>
    </div>
)

export default Home