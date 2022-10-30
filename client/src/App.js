import logo from './logo.svg';
import {Route, Routes} from "react-router-dom";

// Styled Components
import styled from 'styled-components';
// Components
import Navbar from "./components/Navbar/Navbar.index.js";
import Footer from "./components/Footer/Footer.index.js";

//Pages
import Dashboard from './components/Dashboard/Dashboard.index.js';
import Environment from './components/Environment/Environment.index.js';

function App() {
  return (
    <Container>
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/Page2" element={<Environment/>}/>
        </Routes>
      <Footer />
    </Container>
    
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas: 
    "Navbar Body"
    "Footer Footer";
  grid-template-columns: 15vw auto;
  grid-template-rows: 100vh 20vh;
`;

export default App;
