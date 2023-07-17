import './App.css';
import WeatherDisplay from './components/weather-display/weather-display.component';
import WeatherForm from './components/weather-form/weather-form.component';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
          <BrowserRouter>
          <Routes>
            <Route path="/" element={ <WeatherForm/>}>
              </Route>   
              <Route path="/:location" element={<WeatherDisplay/>}></Route>
      </Routes>
</BrowserRouter>
    </div>
  );
};

export default App;
