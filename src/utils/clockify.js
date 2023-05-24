function clockify(secs) {
  let minutes = Math.floor(secs / 60)
  let seconds = secs - minutes * 60

  seconds = seconds < 10 ? '0' + seconds : seconds
  minutes = minutes < 10 ? '0' + minutes : minutes

  return minutes + ':' + seconds
}

export default clockify
