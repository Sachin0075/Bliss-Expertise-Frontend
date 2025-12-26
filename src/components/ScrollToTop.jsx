import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page whenever the route changes
    }, [location]); // Trigger the effect on location change

    return null;
};

export default ScrollToTop;
