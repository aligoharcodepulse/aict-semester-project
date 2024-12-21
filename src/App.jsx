import './App.css'
import AICT from './components/AICT'
import FE from './components/FE'
import PF from './components/PF'
import QuizSelection from './components/QuizSelection'
import StudentDetailsForm from './components/StudentDetailsForm'
import Result from './components/Result'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDetailsForm />} />
        <Route path="/quizSelection" element={<QuizSelection />} />
        <Route path='/quizSelection/functional-english' element={<FE/>}/>
        <Route path='/quizSelection/applications-of-ict' element={<AICT/>}/>
        <Route path='/quizSelection/programming-fundamentals' element={<PF/>}/>
        <Route path="/quizSelection/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
