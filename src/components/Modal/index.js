import { FiX } from "react-icons/fi";
import "./modal.css";

export default function Modal({ children, close }) {
  return (
    <div className="modal">
      <div className="container">
        <div className="header">
          <button onClick={close} className="close">
            <FiX size={24} />
          </button>
        </div>
        <main className="conteudo">
          {children}
        </main>
      </div>
    </div>
  );
}
