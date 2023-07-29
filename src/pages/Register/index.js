import { useState } from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'
import { auth, db } from '../../services/firebaseConnection';
import { toast } from 'react-toastify'


export default function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [loadingAuth, setLoadingAuth] = useState(false)


  async function cadastrar(e){
    e.preventDefault();

    if( email !=='' && password !== '' && name !== '') {
      setLoadingAuth(true)

      await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {

      let uid = value.user.uid

      const userData = {
        uid: value.user.uid,
        name: name,
        email: value.user.email,
      }
      
      localStorage.setItem("@detailUser", JSON.stringify(userData))

      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        senha: password,
        configTreinoPadrao: {series: 3, reps: 12, desc:60}
      }).then(() => {
        toast.success("Seja bem-vindo!")
        navigate("/admin")

        setLoadingAuth(false)
      })

    })
    .catch((Erro) => {
      alert("Erro ao cadastrar" + Erro)

      setLoadingAuth(false)
    })
    } else {
      alert("Preencha todos os campos!")
    }
    
  }

  return(
    <div className="container-center">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>
        <div className="login">
        <form className='form-home' onSubmit={cadastrar}>
          <h1>Criar conta</h1>
          <input 
            type="text" 
            placeholder="Digite seu nome..."
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />
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

          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>

      </div>
    </div>
  )
}