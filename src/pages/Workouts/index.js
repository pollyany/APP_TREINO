import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { BiNotepad } from "react-icons/bi";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";
import '../../styles/pages/_workouts.scss'
import Header from '../../components/Header';

export default function Workouts() {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadTreinos() {
      const treinoRef = collection(db, "/treinos");

      await getDocs(treinoRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
            });
          });
          setTreinos(lista);
          setLoading(false);
        })
        .catch((error) => {
          console.log("DEU ALGUM ERRO AO BUSCAR");
        });
    }

    loadTreinos();
  }, []);

  if (loading) {
    return (
      <div>
        <Header/>
        <Sidebar />
        <div className="content">
          <Title name="Treinos">
            <BiNotepad size={25} />
          </Title>
          <div className="loading">
            <h2>Carregando Treinos...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <Sidebar />
      <main className="content">
        <Title name="Treinos">
          <BiNotepad size={25} color="#121212" />
        </Title>
        <section className="itens-wo">
          {treinos.map((treino) => {
            return (
              <section key={treino.id}>
                <div className="item-treino">
                  <img src={treino.image} alt={treino.name} />
                  <div className="text-centro">
                    <h4>Treino de</h4>
                    <h1>{treino.name}</h1>
                  </div>
                  <Link className="btn-treinos" to={`/startWorkout/${treino.id}`}>
                    TREINE AGORA
                  </Link>
                </div>
              </section>
            );
          })}
        </section>
          
      </main>
    </>
  );
}
