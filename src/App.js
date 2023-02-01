import Style from './components/css/Style.module.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import { Home } from './components/pages/Home';
import { Company } from './components/pages/Company';
import { Contact } from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject.js'
import { Projects } from './components/pages/Projects';
import { EditProject } from './components/pages/EditProject';

import { Container } from './components/layout/Container';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass='minHeight'>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/projects' element={<Projects />} />
          <Route exact path='/newProject' element={<NewProject />} />
          <Route exact path='/company' element={<Company />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/editProject/:id' element={<EditProject />} />
        </Routes>
      
      </Container>
      
      <Footer />
    </Router>
  );
}

export default App;
