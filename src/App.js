import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'




import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/NewProject'
import EditProject from './components/pages/EditProject';

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';





function App() {
  return (


    <Router>

      <NavBar />

      <Container customClass="min-height"  >
        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route path='/Empresa' element={<Company />} />

          <Route path='/Projetos' element={<Projects />} />

          <Route path='/Contato' element={<Contact />} />

          <Route path='/Newproject' element={<NewProject />} />

          <Route path='/Project/:id' element={<EditProject />} />


        </Routes  >
      </Container>

      <Footer />

    </Router >)

}
export default App;
