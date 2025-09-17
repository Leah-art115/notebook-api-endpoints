import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CreateNote from "./pages/CreateNote/CreateNote";
import AllNotes from "./pages/AllNotes/AllNotes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/all-notes" element={<AllNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
