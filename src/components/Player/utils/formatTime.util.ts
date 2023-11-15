export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  const formattedTime = minutes + ':' + String(seconds).padStart(2, '0')

  return formattedTime
}