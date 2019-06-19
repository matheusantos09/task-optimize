import soundFile from '../../assets/sounds/notification_sound.mp3'
import iconNotification from '../../assets/img/icon-notification.png'
import iconPause from '../../assets/img/icon-pause.png'

export const PlaySound = () => {
    new Audio(soundFile).play();
}

export const showNotification = (title, body, icon) => {

    PlaySound();

    var iconUsed = '';

    switch (icon) {
        case('pause'):
            iconUsed = iconPause;
            break

        case ('default'):
            iconUsed = iconNotification;
            break

        default:
            iconUsed = iconNotification;
            break

    }

    new Notification(title, {
        tag: Date.now(),
        body: body,
        icon: iconUsed,
        lang: 'pt-br',
        dir: 'ltr',
    })

}