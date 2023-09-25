// handling routing
import { BrowserRouter, Routes, Route  } from "react-router-dom";
//  importing custom components
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';

// root component of your React application
function App() {
  return (
    // wrapping your entire application in a <BrowserRouter>
    // provides the routing functionality for your app and ensures that the correct components are rendered based on the URL.
    <BrowserRouter>
    // custom component that represents the header of your web application.
      <Header />
        <main>
          /**  using the Routes component from React Router to define your application's routes */
          <Routes>
              // will render the Products component when the URL matches the root path '/'
              <Route path="/" element={<Products />} />
              // will render the Cart component when the URL matches "/cart".
              <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App