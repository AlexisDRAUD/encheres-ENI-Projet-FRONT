import React from 'react';

class NotFound extends React.Component {
    componentDidMount() {
        // Jouer la vidéo de Rick Roll lorsque le composant est monté
        this.playRickRoll();
    }

    playRickRoll() {
        // URL de la vidéo de Rick Roll sur YouTube
        const rickRollUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

        // Redirection vers la vidéo de Rick Roll
        window.location.href = rickRollUrl;
    }

    render() {
        return null;
    }
}

export default NotFound;
