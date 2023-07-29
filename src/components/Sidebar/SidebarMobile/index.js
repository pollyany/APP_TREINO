import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { BiNotepad, BiHistory } from "react-icons/bi";
import { IoIosFitness } from "react-icons/io";
import { IoAccessibility } from "react-icons/io5";
import { auth } from "../../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import "../_sidebar.scss";

export default function SidebarMobile({ close }) {
  async function sair() {
    await signOut(auth);
    localStorage.removeItem("@detailUser");
  }
  return (
    <main id="over-sidebar-mb">
      <aside className={"sidebar-mobile"}>
        <header className="header-sidebar-mb">
          <button onClick={close} className="close">
            <FiX color="#FAA311" size={30} />
          </button>
        </header>
        <nav>
          <Link to="/history">
            <BiHistory size={24} />
            Histórico
          </Link>
          <Link to="/exercises">
            <IoIosFitness size={24} />
            Exercícios
          </Link>
          <Link to="/workouts">
            <BiNotepad size={24} />
            Treinos
          </Link>

          <Link to="/createWorkout">
            <FiEdit size={23} />
            Personalizado
          </Link>

          <Link to="/health">
            <IoAccessibility size={24} />
            Saúde
          </Link>
          <Link to="/profile">
            <FiUser size={24} />
            Perfl
          </Link>
        </nav>
        <footer>
          <nav>
            <Link id="sair" onClick={sair}>
              <FiLogOut size={24} />
              Sair
            </Link>
          </nav>
        </footer>
      </aside>
    </main>
  );
}
