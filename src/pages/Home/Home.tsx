import { ChevronRight } from '@mui/icons-material';
import Button from '@mui/material/Button';
import styles from './Home.module.scss';
import UmbrellaImage from '../../assets/umbrella.png';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { ROUTES } from '../../constants/routes.constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMapsStore } from '../../stores/maps.store';
import { Texts } from '../../texts/texts';

export default function Home() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const { getCurrentLocation } = useMapsStore();
    
    async function handleClickOnNextPage() {
        try {
            await getCurrentLocation()
            navigate(ROUTES.WEATHER);
        } catch (error) {
            if (error) {
                setOpenSnackbar(true);
            }
        }
    }

    function handleCloseSnackbar() {
        setOpenSnackbar(false);
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    <AlertTitle>{Texts.home.snackbar.title}</AlertTitle>
                    {Texts.home.snackbar.message}
                </Alert>
            </Snackbar>
            <main className={styles['page-home']}>
                <figure>
                    <img src={UmbrellaImage} alt={Texts.home.imageAlt} />
                </figure>
                <header>
                    <h1>{Texts.home.title}</h1>
                </header>
                <section>
                    <Button 
                        variant="contained" 
                        endIcon={<ChevronRight />} 
                        onClick={handleClickOnNextPage}
                    >
                        {Texts.home.button.text}
                    </Button>
                </section>
            </main>
        </>
  );
}
