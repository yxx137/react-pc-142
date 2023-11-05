import './App.css'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { MessageWrapper } from './utils/message'
import { AuthRouthe } from '@/components/AuthRoute'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import { history } from './utils/history'


function App () {
  return (
    <HistoryRouter history={history}>
      <MessageWrapper>
        <div className="App">
          <Routes>
            <Route path='/' element={<AuthRouthe><Layout /></AuthRouthe>}>
              <Route index element={<Home />}></Route>
              <Route path='article' element={<Article />}></Route>
              <Route path='publish' element={<Publish />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
      </MessageWrapper>
    </HistoryRouter >
  )
}

export default App
