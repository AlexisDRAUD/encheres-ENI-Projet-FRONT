import { useEffect } from 'react';
import AuthService from './auth-service';

const SessionTimeout = () => {
    useEffect(() => {
        let logoutTimer;
        const resetTimeout = () => {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                AuthService.logout();
                window.location.reload();
            }, 5 * 60 * 1000);
        };

        const eventListeners = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].map((event) =>
            document.addEventListener(event, resetTimeout)
        );

        resetTimeout();

        return () => {
            // eslint-disable-next-line no-restricted-globals
            eventListeners.forEach((eventListener) => document.removeEventListener(event, resetTimeout));
            clearTimeout(logoutTimer);
        };
    }, []);

    return null;
};

export default SessionTimeout;
