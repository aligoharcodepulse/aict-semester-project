import './App.css'
import AICT from './components/AICT'
import FE from './components/FE'
import PF from './components/PF'
import QuizSelection from './components/QuizSelection'
import StudentDetailsForm from './components/StudentDetailsForm'
import Result from './components/Result'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import { useState,useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'


const AppContent = ({ user }) => {

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/details-form" element={<ProtectedRoute user={user}> <StudentDetailsForm/> </ProtectedRoute>} />
        <Route path="/quizSelection" element={<ProtectedRoute user={user}> <QuizSelection/> </ProtectedRoute>} />
        <Route path='/quizSelection/functional-english' element={<ProtectedRoute user={user}> <FE/> </ProtectedRoute>}/>
        <Route path='/quizSelection/applications-of-ict' element={<ProtectedRoute user={user}> <AICT/> </ProtectedRoute>}/>
        <Route path='/quizSelection/programming-fundamentals' element={<ProtectedRoute user={user}> <PF/> </ProtectedRoute>}/>
        <Route path="/quizSelection/result" element={<ProtectedRoute user={user}> <Result/> </ProtectedRoute>} />
      </Routes>
    </>
  )
};

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unSubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <BrowserRouter>
        <AppContent user={user} />
      </BrowserRouter>
    </>
  );
}

export default App
