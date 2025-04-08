import { useLoadScript } from "@react-google-maps/api"

function App() {
  useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  
  return (
    <></>
   )
}

export default App
