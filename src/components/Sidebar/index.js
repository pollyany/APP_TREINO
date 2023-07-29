import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiLogOut } from "react-icons/fi";
import { BiNotepad, BiHistory } from "react-icons/bi";
import { IoIosFitness } from "react-icons/io";
import { IoAccessibility } from "react-icons/io5";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import './_sidebar.scss'

export default function Sidebar() {

  async function sair() {
    await signOut(auth);
    localStorage.removeItem("@detailUser");
  }

  return (
    <>
    <aside className={'sidebar'}>
      <header>
        <div className="divLogo">
        <img src={logo} alt="logo" />
      </div>
      <div className="name">
        <strong>Gym Pro</strong>
      </div>
      </header>
      <nav>
      <Link to="/history">
        <BiHistory color="#fff" size={24} />
        Histórico
      </Link>
      <Link to="/exercises">
        <IoIosFitness color="#fff" size={24} />
        Exercícios
      </Link>
      <Link to="/workouts">
        <BiNotepad color="#fff" size={24} />
        Treinos
      </Link>

      <Link to="/createWorkout">
        <FiEdit color="#fff" size={23} />
        Personalizado
      </Link>

      <Link to="/health">
        <IoAccessibility color="#fff" size={24} />
        Saúde
      </Link>
      <Link to="/profile">
        <FiUser color="#fff" size={24} />
        Perfl
      </Link>
      <Link id="sair" onClick={sair}>
        <FiLogOut color="#ffffffb3" size={24} />
        Sair
      </Link>
      </nav>
    </aside>
    </>
  );
}
