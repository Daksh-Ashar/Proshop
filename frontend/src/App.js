// Importing bootstrap items
import { Container } from 'react-bootstrap';
// Importing Outlet 
import { Outlet } from 'react-router-dom';
// Importing all components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-3'>
        <Container>
            <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
