import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'
import Search from './pages/Search'

import './App.css'  

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='projects' element={<Projects />} />
                <Route path='users' element={<UserList />} />
                <Route path='users/:id' element={<UserDetail />} />
                <Route path='search' element={<Search />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
