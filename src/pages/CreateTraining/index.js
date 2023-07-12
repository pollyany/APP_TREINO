import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiEdit } from "react-icons/fi";


export default function CreateTraining() {
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Personalizado">
        <FiEdit size={24} />
        </Title>

        <div className="container">
          <h2>Crie seu treino</h2>
        </div>
      </div>
    </div>
  );
}
