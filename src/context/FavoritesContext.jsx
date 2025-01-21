/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import ApiSetup from "../utils/ApiSetup";
import toast from "react-hot-toast";

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

const FavoritesProvider = ({ children }) => {
    const [allFavorites, setAllFavorites] = useState([]);
    const [favoritesMap, setFavoritesMap] = useState(new Map()); // Map to keep track of favorited packages
    const api = ApiSetup();

    const addToFavorites = async (package_id) => {
        try {
            const res = await api.post("/favorites/favorite", { package_id });

            if (res.data.success !== true) return;

            toast.success("Package successfully added!");
            getFavorites(); // Re-fetch the favorites to update the UI
        } catch (error) {
            console.error(error);
        }
    };

    const getFavorites = async () => {
        try {
            const res = await api.get("/favorites/favorite");
            if (res?.data?.success) {
                const favorites = res?.data?.data || [];
                setAllFavorites(favorites);

                // Create a map for quick lookup of favorited items
                const favoritesMap = new Map();
                favorites.forEach((favorite) => {
                    favoritesMap.set(favorite.package_id, true);
                });
                setFavoritesMap(favoritesMap);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const isFavorited = (package_id) => {
        return favoritesMap.has(package_id);
    };

    return (
        <FavoriteContext.Provider value={{ addToFavorites, allFavorites, isFavorited }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoritesProvider;
