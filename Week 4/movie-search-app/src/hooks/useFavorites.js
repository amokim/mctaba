import { useEffect, useState } from "react";
import { CHANGE_EVENT, STORAGE_KEY, getFavorites} from "../utils/favorites.js";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(getFavorites());

    useEffect(() => {
        const refresh = () => setFavorites(getFavorites());
        const onStorage = (event) => {
            if (event.key === STORAGE_KEY) refresh();
        };

        window.addEventListener(CHANGE_EVENT, refresh);
        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener(CHANGE_EVENT, refresh);
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    return favorites;
}