import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home'
import Mangas from './pages/Mangas/Mangas'

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="mangas" element={<Mangas></Mangas>}/>
            <Route path="mangas/:id" element={<>manga/:id</>}/>
            {/* <Route path="api" element={<Swagger/>}/> */}
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
