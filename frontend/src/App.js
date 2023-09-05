import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Pelanggan from './pages/Admin/Pelanggan';
import Laundry from './pages/Laundry';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Laundry />} />
            <Route path="/pelanggan" element={<Pelanggan />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
