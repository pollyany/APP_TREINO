import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import Header from '../../components/Header';
export default function Profile() {
  return (
    <div>
      <Header/>
      <Sidebar />

      <div className="content">
        <Title name="Perfil">
          <FiUser size={25} />
        </Title>

        <div className="container">

          <h2>Edite   seus dados:</h2>
        </div>
      </div>
    </div>
  );
}
