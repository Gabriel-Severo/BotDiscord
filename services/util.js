function timeMsToObj(ms) {
  return {
    seconds: ~~((ms / 1000) % 60),
    minutes: ~~(ms / (1000 * 60) % 60),
    hours: ~~(ms / (1000 * 3600)),
  };
}
function formatDuration(durationObj) {
  const { hours, minutes, seconds } = durationObj;
  let length = '';

  if(hours >= 1) {
    if(hours >= 10) length += hours + ':'
    else length += '0' + hours + ':'
  }

  if(minutes >= 1) {
    if(minutes >= 10) length += minutes + ':'
    else length += '0' + minutes + ':'
  }else length += '00:'

  if(seconds >= 1) {
    if(seconds >= 10) length += seconds
    else length += '0' + seconds
  }else length += '00'

  return length;
}
function estimatedToPlay(message, nowPlaying = false) {
  let totalMS = 0;
  message.guild.musicData.queue.forEach((video) => {
    totalMS += video.duration.ms;
  });
  
  if (message.guild.musicData.songDispatcher && nowPlaying) {
    const streamTime = message.guild.musicData.songDispatcher.streamTime;
    const nowPlayingTime = message.guild.musicData.nowPlaying.duration.ms;

    totalMS += nowPlayingTime - streamTime;
  }
  const time = timeMsToObj(totalMS);
  return formatDuration(time);
}
module.exports = {
  estimatedToPlay,
  formatDuration,
  timeMsToObj
};
