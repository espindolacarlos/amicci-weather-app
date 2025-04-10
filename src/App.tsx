import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import { ROUTES } from "./constants/routes.constants"
import Weather from "./pages/Weather/Weather"
import { useLoadScript } from "@react-google-maps/api"
import { ThemeProvider } from "@emotion/react"
import { Alert, AlertTitle, createTheme, Snackbar } from "@mui/material"
import './App.scss'
import './styles/skeleton.providers.scss'
import { useNotifyStore } from "./stores/notify.store"

function App() {

  const { isActive, notification, close } = useNotifyStore()

  useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isActive}
        onClose={close}>
        <Alert
            onClose={close}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}>
            <AlertTitle>{ notification.title }</AlertTitle>
            { notification.description }
        </Alert>
      </Snackbar>
      
      <Routes>
        <Route path={ ROUTES.HOME } element={<Home />} />
        <Route path={ ROUTES.WEATHER } element={<Weather />} />
      </Routes>
    </ThemeProvider>
   )
}

export default App
