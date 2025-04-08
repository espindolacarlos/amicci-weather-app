import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import { ROUTES } from "./constants/routes.constants"
import Weather from "./pages/Weather/Weather"
import { useLoadScript } from "@react-google-maps/api"

function App() {
  useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  
  return (
    <Routes>
      <Route path={ ROUTES.HOME } element={<Home />} />
      <Route path={ ROUTES.WEATHER } element={<Weather />} />
    </Routes>
   )
}

export default App
