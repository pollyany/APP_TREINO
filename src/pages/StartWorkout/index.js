import { useEffect, useState } from "react";
import {
  getDocs,
  doc,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { BiNotepad } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import "../../styles/pages/_startworkout.scss";
import Header from '../../components/Header';

export default function StartWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treino, setTreino] = useState([]);
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [series, setSeries] = useState();
  const [reps, setReps] = useState();
  const [desc, setDesc] = useState();
  const userDetail = localStorage.getItem("@detailUser");
  const userUid = JSON.parse(userDetail);
  useEffect(() => {
    async function loadTreino() {
      const treinoRef = collection(db, `/treinos/${id}/exercicios`);

      await getDocs(treinoRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
              nameTreino: doc.data().nameTreino,
            });
          });
          setTreino(lista);
          async function getConfigs() {
            const docRef = doc(db, "users", userUid.uid);
            await onSnapshot(docRef, (snapshot) => {
              setConfigs(snapshot.data().configsPadrao);
            });
          }
          getConfigs();
          setLoading(false);
        })
        .catch((error) => {
          console.log("DEU ALGUM ERRO AO BUSCAR");
        });
    }

    loadTreino();
  }, []);

  async function editConfigs() {
    const docRef = doc(db, "users", userUid.uid);
    await updateDoc(docRef, {
      configsPadrao: { series, reps, desc },
    });
    setShowModal(!showModal);
  }

  function showModalConfig() {
    setShowModal(!showModal);
  }
  async function saveTreino() {
    const date = new Date().toLocaleString()
    await addDoc(collection(db, "historico"), {
      created: date,
      user: userUid.uid,
      nameTreino: treino[0].nameTreino,
      tamanho: treino.length,
      series: configs.series,
      reps: configs.reps,
    })
      .then(() => {
        toast.success("Salvo com sucesso!");
        navigate("/history");
      })
      .catch(() => {
        alert("Algo deu errado");
      });
  }
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Treino...</h2>
      </div>
    );
  }
return (
  <>
    <Header/>
    <Sidebar />
    <div className="content">
    <Title name={`Treino de ${treino[0].nameTreino}`}>
      <BiNotepad size={25} color="#121212" />
    </Title>
    <div className="content-treino">
      <div className="list-exercicios">
        <div className="header-list">
          <h2>Lista de exercícios</h2>
          <button onClick={() => showModalConfig()}>
            <IoMdSettings size={24} />
          </button>
        </div>
        <section className="list-conteudo">
          {treino.map((ex) => {
            return (
              <div key={ex.id}>
                <article>
                  <img src={ex.image} alt={ex.name} />
                  <span className="name-ex">
                    <i>{ex.name}</i>
                  </span>
                  <div className="area-span">
                    <div>
                      <span>Series:</span>
                      <span>{configs.series}</span>
                    </div>
                    <div>
                      <span>Reps:</span>
                      <span>{configs.reps}</span>
                    </div>
                    <div>
                      <span>Desc:</span>
                      <span>{configs.desc}s</span>
                    </div>
                  </div>
                </article>
                <hr></hr>
              </div>
            );
          })}
        </section>
        <button className="btn-init" onClick={() => saveTreino()}>
          Concluir
        </button>
      </div>
    </div>
    </div>

    {showModal && (
      <Modal close={() => setShowModal(!showModal)}>
        <section className="configs">
        <div className="row-configs">
          <div className="input-config">
            <label>Series: </label>
            <input
              type="number"
              min={1}
              max={100}
              placeholder={configs.series}
              value={series}
              onChange={(e) => setSeries(e.target.value)}
            />
          </div>
          <div className="input-config">
            <label>Repetições: </label>
            <input
              type="number"
              min={1}
              max={300}
              placeholder={configs.reps}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="input-config">
            <label>Descanso: </label>
            <input
              type="number"
              min={0}
              max={1000}
              placeholder={configs.desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button onClick={() => editConfigs()}>Concluir</button>
        </div>
        </section>
        
      </Modal>
    )}
  </>
  );
}
