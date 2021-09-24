import {
  BiDizzy,
  BiHappy,
  BiHappyHeartEyes,
  BiMeh,
  BiMehBlank,
  BiSmile,
} from 'react-icons/bi'

export const getRatingColor = (rating: number) => {
  if (rating === 0) {
    return { color: 'none', icon: BiMehBlank }
  }
  if (rating <= 3.5) {
    return { color: 'yellow', icon: BiDizzy }
  } else if (rating <= 5.5) {
    return { color: 'pink', icon: BiMeh }
  } else if (rating <= 7) {
    return { color: 'purple', icon: BiSmile }
  } else if (rating <= 8) {
    return { color: 'green', icon: BiHappy }
  } else {
    return { color: 'blue', icon: BiHappyHeartEyes }
  }
}
