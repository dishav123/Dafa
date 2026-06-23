import './App.css'
import HomePage from "./Pages/Homepage";
import ProjectBajaBanner from './Pages/ProjectBajaBanner';
import ShowGallery from './Pages/ShowGallery';
import Works from './Pages/Works';
import ShowVideo from './Pages/ShowVideo';
import EventCalender from './Pages/EventCalender';

function App() {
  return (
    <div className="App flex flex-col gap-y-5">
      <HomePage />
      <Works />
      <ShowVideo />
      <ProjectBajaBanner/>
      <ShowGallery/>
      <EventCalender />

    </div>
  );
}

export default App;