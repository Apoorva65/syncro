import { useEffect } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { useDispatch } from 'react-redux'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './services/firebase'
import { authSuccess,logout } from './features/auth/authSlice'
import './App.css'
import Project from './Pages/Project'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(authSuccess({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
    }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/dashboard' element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/projects/:projectId' element = {
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        } />
      <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
