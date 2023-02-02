import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerCurrentTime = 'videoplayer-current-time';
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const onPlay = function({seconds}) {
        localStorage.setItem(playerCurrentTime, seconds);
    console.log(seconds);
};

player.on('timeupdate', throttle(onPlay,1000));
player.setCurrentTime(localStorage.getItem(playerCurrentTime)||0);