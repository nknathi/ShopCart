import { BrowserRouter, Routes, Route  } from "react-router-dom";

import { Header } from './components/Header';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App