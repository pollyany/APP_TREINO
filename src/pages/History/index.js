import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import { BiHistory } from "react-icons/bi";
import Header from "../../components/Header";
import "./_history.scss";

export default function History() {
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    
    async function loadHistory() {
      const userDetail = localStorage.getItem("@detailUser");
      const user = JSON.parse(userDetail);
      if (userDetail) {
        const userUid = user.uid;
  
        const Ref = collection(db, "historico");
  
        const q = query(
          Ref,
          orderBy("created", "desc"),
          where("user", "==", userUid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];
  
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              date: doc.data().created,
              nameTreino: doc.data().nameTreino,
              reps: doc.data().reps,
              series: doc.data().series,
              tam: doc.data().tamanho,
            });
          });
          console.log(lista)
          setHistorys(lista);
        });
      }
    }
    
    loadHistory();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="content">
        <Title name="Histórico">
          <BiHistory size={25} />
        </Title>
        <h1 id="title-history">Seus ultimos treinos</h1>
        <section className="container-history">
          
            {historys.map((doc) => {
            return(
              <article className="data-history" key={doc.id}>
                <span>{doc.date}</span>
                <h2>{doc.nameTreino}</h2>
                <section className="row">
                <span>{doc.tam} Exercícios</span>
                <section>
                  <span>{doc.series}</span>
                  <span> x </span>
                  <span>{doc.reps}</span>
                </section>
                </section>
              </article>
            )
          })}
        </section>
      </main>
    </>
  );
}
