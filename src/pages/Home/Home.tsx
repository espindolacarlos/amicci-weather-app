import { ChevronRight } from '@mui/icons-material';
import Button from '@mui/material/Button';
import styles from './Home.module.scss';
import UmbrellaImage from '../../assets/umbrella.png';
import { ROUTES } from '../../constants/routes.constants';
import { useNavigate } from 'react-router-dom';
import { useMapsStore } from '../../stores/maps.store';
import { Texts } from '../../texts/texts';
import { useNotifyStore } from '../../stores/notify.store';

export default function Home() {
    const navigate = useNavigate();
    const { getCurrentLocation } = useMapsStore();
    const { notify } = useNotifyStore();
    
    async function handleClickOnNextPage() {
        try {
            await getCurrentLocation()
            navigate(ROUTES.WEATHER);
        } catch (error) {
            if (error) {
                notify(
                    Texts.home.notificationError.title,
                    Texts.home.notificationError.description,
                )
            }
        }
    }


    return (
        <>
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
