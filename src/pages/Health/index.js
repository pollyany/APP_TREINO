import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { IoAccessibility } from "react-icons/io5";
import '../../styles/pages/_health.scss'
import Header from '../../components/Header';

export default function Health() {
  return (
    <div>
      <Header/>
      <Sidebar />

      <div className="content">
        <Title name="Saúde">
          <IoAccessibility size={25} />
        </Title>

        <div className="container-health">
          <h2>Seus dados:</h2>
          <div className="dados">
            <span>Peso: 50</span>
            <span>Altura: 162cm</span>
          </div>
          <h2>Situação:</h2><br/>
          <h3>~~Saudavel~~</h3>
        </div>
      </div>
    </div>
  );
}
