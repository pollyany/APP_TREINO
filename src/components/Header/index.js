import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiLogOut } from "react-icons/fi";
import { BiNotepad, BiHistory } from "react-icons/bi";
import { IoIosFitness } from "react-icons/io";
import { IoAccessibility } from "react-icons/io5";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import '../../styles/components/_header.scss'

export default function Header() {
  async function sair() {
    await signOut(auth);
    localStorage.removeItem("@detailUser");
  }

  return (
    <div className="sidebar">
      <div className="divLogo">
        <img src={logo} alt="logo" />
      </div>

      <div className="teste">
        <strong>Training is life!</strong>
      </div>
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
      <Link onClick={sair}>
        <FiLogOut color="#fff" size={24} />
        Sair
      </Link>
    </div>
  );
}
