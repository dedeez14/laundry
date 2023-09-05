import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Pelanggan from './pages/Admin/Pelanggan';
import Laundry from './pages/Laundry';
import TerimaCucian from './pages/TerimaCucian';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Laundry />} />
            <Route path="/pelanggan" element={<Pelanggan />} />
            <Route path="/terima-cucian" element={<TerimaCucian />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
