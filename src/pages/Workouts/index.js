import Header from "../../components/Header";
import Title from "../../components/Title";
import { BiNotepad } from "react-icons/bi";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import "./workouts.css";
import { Link } from "react-router-dom";

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
        <Header />
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
    <div>
      <Header />
      <div className="content">
        <Title name="Treinos">
          <BiNotepad size={25} color="#121212" />
        </Title>

        <div className="container-treinos">
          {treinos.map((treino) => {
            return (
              <div key={treino.id}>
                <div className="capa">
                  <img src={treino.image} alt={treino.name} />
                  <div className="text-centro">
                    <h4>Treino de</h4>
                    <h1>{treino.name}</h1>
                  </div>
                  <Link className="btn-treinos" to={`/iniciarTreino/${treino.id}`}>
                    TREINE AGORA
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
