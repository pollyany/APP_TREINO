import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import Register from '../pages/Register';
import Admin from '../pages/Admin'
import Private from './Private';
import Error from '../pages/Error';
import Health from '../pages/Health';
import Workouts from '../pages/Workouts';
import Exercises from '../pages/Exercises';
import CreateWorkout from '../pages/CreateWorkout';
import Profile from '../pages/Profile';
import StartWorkout from '../pages/StartWorkout';
import History from '../pages/History';

function RoutesApp(){
  return(
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/register" element={ <Register/> } />
      <Route path='/history' element={ <Private><History/></Private>  } />
      <Route path='/exercises' element={ <Private><Exercises/></Private>  } />
      <Route path='/health' element={ <Private><Health/></Private>  } />
      <Route path='/startWorkout/:id' element={ <Private><StartWorkout/></Private> } />
      <Route path='/workouts' element={ <Private><Workouts/></Private> } />
      <Route path='/createWorkout' element={ <Private><CreateWorkout/></Private> } />
      <Route path='/profile' element={ <Private><Profile/></Private> } />

      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default RoutesApp;