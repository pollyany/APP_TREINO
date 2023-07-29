import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { FiEdit } from "react-icons/fi";
import Header from '../../components/Header';

export default function CreateWorkout() {
  return (
    <main>
      <Header/>
      <Sidebar />
      <section className="content">
        <div>
        <Title name="Personalizado">
        <FiEdit size={24} />
        </Title>

        <div className="container">
          <h2>Crie seu treino</h2>
        </div>
      </div>
      </section>
      
    </main>
  );
}
