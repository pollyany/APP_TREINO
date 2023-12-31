import "../../styles/pages/_exercises.scss";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { IoIosFitness } from "react-icons/io";
import { BiInfoCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import Modal from "../../components/Modal";
import Header from "../../components/Header";

export default function Exercises() {
  const [exercicios, setExercicios] = useState([]);
  const [grupo, setGrupo] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function loadExercicios() {
      const path = [
        "/exercicios/biceps/exercicios",
        "/exercicios/costas/exercicios",
        "/exercicios/abdominais/exercicios",
        "/exercicios/ombros/exercicios",
        "/exercicios/panturrilha/exercicios",
        "/exercicios/peito/exercicios",
        "/exercicios/pernas/exercicios",
        "/exercicios/triceps/exercicios",
      ];

      let lista = [];
      for (let i = 0; i <= 7; i++) {
        const exerciseRef = collection(db, path[i]);
        await getDocs(exerciseRef)
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              lista.push({
                id: doc.id,
                name: doc.data().name,
                image: doc.data().image,
              });
            });
          })
          .catch((error) => {
            console.log("DEU ALGUM ERRO AO BUSCAR");
          });
      }
      setExercicios(lista);
      setLoading(false);
    }

    loadExercicios();
  }, []);

  async function buscarGrupo(e) {
    setGrupo(e.target.value);
    const option = e.target.value;
    const exerciseRef = collection(db, `/exercicios/${option}/exercicios`);

    if (option === "todos") {
      const path = [
        "/exercicios/biceps/exercicios",
        "/exercicios/costas/exercicios",
        "/exercicios/abdominais/exercicios",
        "/exercicios/ombros/exercicios",
        "/exercicios/panturrilha/exercicios",
        "/exercicios/peito/exercicios",
        "/exercicios/pernas/exercicios",
        "/exercicios/triceps/exercicios",
      ];

      let lista = [];
      for (let i = 0; i <= 7; i++) {
        const exerciseRef = collection(db, path[i]);
        await getDocs(exerciseRef)
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              lista.push({
                id: doc.id,
                name: doc.data().name,
                image: doc.data().image,
              });
            });
          })
          .catch((error) => {
            console.log("DEU ALGUM ERRO AO BUSCAR");
          });
      }
      setExercicios(lista);
    } else {
      await getDocs(exerciseRef)
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
            });
          });
          setExercicios(lista);
        })
        .catch((error) => {
          console.log("DEU ALGUM ERRO AO BUSCAR");
        });
    }
  }

  function toggleModal(exercicio) {
    setShowModal(!showModal);
    setDetail(exercicio);
  }

  if (loading) {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="content">
          <Title name="Exercícios">
            <IoIosFitness size={25} />
          </Title>
          <div className="loading">
            <h2>Carregando Exercícios...</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <Sidebar />

      <main className="content">
        <Title name="Exercícios">
          <IoIosFitness size={25} />
        </Title>

        <form className="form-filter">
          <select className="group-list" value={grupo} onChange={buscarGrupo}>
            <option value={"todos"}>Todos</option>
            <option value="abdominais">Abdominais</option>
            <option value="ombros">Ombros</option>
            <option value="peito">Peitoral</option>
            <option value="pernas">Pernas</option>
            <option value="biceps">Bíceps</option>
            <option value="costas">Costas</option>
            <option value="panturrilha">Panturrilha</option>
            <option value="triceps">Tríceps</option>
          </select>
        </form>

        <section id="itens-ex">
          {exercicios.map((exercicio) => {
            return (
              <section key={exercicio.id}>
                <div className="item-ex"
                    onClick={() => toggleModal(exercicio)}>
                  <img src={exercicio.image} alt={exercicio.name} />
                  <span>{exercicio.name}</span>
                </div>
              </section>
            );
          })}
        </section>
      </main>

      {showModal && (
        <Modal close={() => setShowModal(!showModal)} title={detail.name}>
          <div className="img-modal">
            <img src={detail.image} alt={detail.name} />
          </div>
          <div className="conteudo-2">
            <span className="text-title">Preparação:</span>
            <p>
              1. consequatur voluptatem et magnam pariatur a Quis distinctio ea
              fuga tempore! Et illum nisi rem velit nostrum a molestias ullam.
            </p>
            <p>
              2. consequatur voluptatem et magnam pariatur a Quis distinctio ea
              fuga tempore! Et illum nisi rem velit nostrum a molestias ullam.
            </p>

            <div className="row">
              <span className="text-title">Dicas:</span>
              <p>
                consequatur voluptatem et magnam pariatur a Quis distinctio ea
                fuga tempore! Et illum nisi rem velit nostrum a molestias ullam.
                consequatur voluptatem et magnam pariatur a Quis distinctio ea
                fuga tempore! Et illum nisi rem velit nostrum a molestias
                ullam.consequatur voluptatem et magnam pariatur a Quis
                distinctio ea fuga tempore! Et illum nisi rem velit nostrum a
                molestias ullam.
              </p>
            </div>
            <div id="musc-target">
              <span>
                Músculos alvo:<i>Peitoral</i>
              </span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
