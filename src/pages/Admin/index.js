// import { useState, useEffect } from 'react'
// import Sidebar from '../../components/Sidebar'
// import Header from '../../components/Header';
// import '../../styles/pages/_admin.scss'

// export default function Admin(){
//   const [user, setUser] = useState({})

//   useEffect(() => {
//     async function getUser(){
//       const userDetail = localStorage.getItem("@detailUser")
//       await setUser(JSON.parse(userDetail))
//     }    
//     getUser();
//   }, [])

//   return(
//     <main>
//      <Header/>
//       <Sidebar />
//     <section className="content"> 
//       <h1>Olá, {user.name}!</h1>
//       <br />
//       <h3>Tem coisa melhor do que sentir o corpo suado e ver que a missão foi cumprida? 🤩</h3>
//       <br/><br/>
//     </section>
//     </main>
       
//   )
// }
