import React from 'react';
import soundfile from '../../assets/sounds/notification_sound.mp3'

const SoundNotification = () => {
    var myRef = React.createRef();
    return (
        <audio ref={myRef} src={soundfile} autoPlay/>
    )
}

export default SoundNotification