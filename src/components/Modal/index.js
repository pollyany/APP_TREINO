import { FiX } from "react-icons/fi";
import '../../styles/components/_modal.scss'

export default function Modal({ children, close, title }) {
  return (
    <div className="modal">
      <div className="container">
        <div className="header-modal">
          <button onClick={close} className="close">
            <FiX size={32} />
          </button>
          <h3>{title}</h3>
        </div>
        <main className="conteudo">
          {children}
        </main>
      </div>
    </div>
  );
}
