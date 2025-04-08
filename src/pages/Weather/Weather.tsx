import { useNavigate } from "react-router-dom";
import { useMapsStore } from "../../stores/maps.store";
import { ROUTES } from "../../constants/routes.constants";
import { useEffect } from "react";

export default function Weather() {
    const { geolocation } = useMapsStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!geolocation) {
            navigate(ROUTES.HOME);
        }
    }, [geolocation, navigate]);

    return (
       <div />
    );
}