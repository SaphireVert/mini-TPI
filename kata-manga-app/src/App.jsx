import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="mangas" element={<>mangas</>}></Route>
            <Route path="mangas/:id" element={<>manga/:id</>}/>
            <Route path="api" element={<>api</>}/>
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
