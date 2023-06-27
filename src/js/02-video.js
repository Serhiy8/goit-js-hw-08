import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player');

const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
};

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));

player.on('timeupdate', throttle(onPlay, 1000));
