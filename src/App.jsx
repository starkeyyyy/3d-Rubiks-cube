import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import MainCube from "./components/Cube";
import Test from "./components/Test";


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainCube />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
    </>
  );
}
