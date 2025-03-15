import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import Navbar from './component/Navbar'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/create' element={<CreateBlog />}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
