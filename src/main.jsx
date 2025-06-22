import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';  // Mengimpor gaya default Ant Design
import './App.css';
// import './custom.css';
import './styles/GlobalPoppins.css'; // Import global Poppins font CSS
import './styles/AntDesignPoppins.css'; // Import Ant Design Poppins override CSS
import './styles/BootstrapPoppins.css'; // Import Bootstrap Poppins override CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

