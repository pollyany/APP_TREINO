import Header from "../../components/Header";
import Title from "../../components/Title";
import { BiHistory } from "react-icons/bi";


export default function History() {
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Histórico">
          <BiHistory size={25} />
        </Title>

        <div className="container">
          <h2>;)</h2>
        </div>
      </div>
    </div>
  );
}
