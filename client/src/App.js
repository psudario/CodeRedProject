import logo from './logo.svg';

// Styled Components
import styled from 'styled-components';
// Components
import Dashboard from './components/Dashboard/Dashboard.index';
import Navbar from "./components/Navbar/Navbar.index.js";
import Footer from "./components/Footer/Footer.index.js";
function App() {
  return (
    <Container>
      <Navbar />
      <Dashboard />
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
`;

export default App;
