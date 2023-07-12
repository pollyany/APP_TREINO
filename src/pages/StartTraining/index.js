import { useEffect, useState } from "react";
import {
  getDocs,
  doc,
  collection,
  onSnapshot,
  updateDoc,
  addDoc
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { BiNotepad } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { toast } from 'react-toastify'
import Modal from "../../components/Modal";
import "./startTraining.css";

export default function StartTraining() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [treino, setTreino] = useState([]);
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [series, setSeries] = useState()
  const [reps, setReps] = useState()
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
    console.log(treino)
  }, []);

 async function editConfigs() {
    const docRef = doc(db, "users", userUid.uid);
    await updateDoc(docRef, {
      configsPadrao: {series, reps}
    })
    setShowModal(!showModal);
  }

  function showModalConfig() {
    setShowModal(!showModal);
  }
 async function saveTreino() {

    await addDoc(collection(db, "historico"), {
      nameTreino: treino[0].nameTreino,
      created: new Date(),
      user: userUid.uid
    })
    .then(() => {
        toast.success("Salvo com sucesso!")
        navigate("/history")
    })
    .catch(() => {
      alert('Algo deu errado')
    })
  }
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Treino...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
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
            <main className="list-conteudo">
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
                      </div>
                      
                    </article>
                    <hr></hr>
                  </div>
                );
              })}
            </main>
            <button className="btn-init" onClick={() => saveTreino()}>Concluir</button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal close={() => setShowModal(!showModal)}>
          <div className="row-configs">
            <div className="input-config">
              <label>Series:</label>
              <input
                type="number"
                min={1}
                max={10}
                placeholder={configs.series}
                value={series}
                onChange={ (e) => setSeries(e.target.value)}
              />
            </div>
            <div className="input-config">
              <label>Repetições:</label>
              <input
                type="number"
                min={1}
                max={100}
                placeholder={configs.reps}
                value={reps}
                onChange={ (e) => setReps(e.target.value)}
              />
            </div>
          </div>
          <button onClick={() => editConfigs()}>Concluir</button>
        </Modal>
      )}
    </div>
  );
}
