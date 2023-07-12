import { useState} from 'react'
import './home.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'


export default function Home(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false)
  const navigate = useNavigate();

async  function fazerLogin(e) {
    e.preventDefault()
    if( email !=='' && password !== '') {
      setLoadingAuth(true)
      await signInWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      let uid = value.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef)

      let data = {
        uid: uid,
        name: userSnap.data().name,
        email: value.user.email
      }

      localStorage.setItem("@detailUser", JSON.stringify(data))
      setLoadingAuth(false)
      toast.success("Bem-vindo(a) de volta!")
      navigate("/admin")
    })
    .catch((Erro) => {
      setLoadingAuth(false)
      toast.error("Ops algo deu errado!")
    })
    } else {
      alert("Preencha todos os campos")
    }
    
  }

  return(
    <div className="container-center">

        <div className="login-area">
          <h2 className='h2'>Training is life!</h2>
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <div className='login'>
        <form className='form-home' onSubmit={fazerLogin}>
          <h1>Acessar</h1>
          <input 
            type="text" 
            placeholder="email@email.com"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input 
            type="password" 
            placeholder="********"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">{loadingAuth ? 'Carregando...' : 'Entrar'}</button>
        </form>

        <Link to="/register">Não tem conta? Clique aqui</Link>
        </div>

      </div>

  )
}