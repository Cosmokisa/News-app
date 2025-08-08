import { createContext, useState, useContext, useEffect } from 'react';

const ArticleContext = createContext();

export const useArticleContext = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const storedSaved = localStorage.getItem('saved');

        if (storedSaved) setSaved(JSON.parse(storedSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem('saved', JSON.stringify(saved));
    }, [saved]);

    const addToSaved = (article) => {
        setSaved((prev) => [...prev, article]);
    };

    const removeFromSaved = (articleUrl) => {
        setSaved((prev) =>
            prev.filter((article) => article.url !== articleUrl)
        );
    };

    const isSaved = (articleUrl) => {
        return saved.some((article) => article.url === articleUrl);
    };

    const value = {
        saved,
        addToSaved,
        removeFromSaved,
        isSaved,
    };

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    );
};
