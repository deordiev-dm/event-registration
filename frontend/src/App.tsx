import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventBoard from "./pages/EventBoard";
import EventRegistration from "./pages/EventRegistration";
import EventView from "./pages/EventView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventBoard />}></Route>
        <Route path="/registration/:id" element={<EventRegistration />}></Route>
        <Route path="/view/:id" element={<EventView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
