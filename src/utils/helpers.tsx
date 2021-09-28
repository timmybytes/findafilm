import { BiHappy, BiHappyHeartEyes, BiMeh, BiMehBlank } from 'react-icons/bi'

export const getRatingColor = (rating: number) => {
  if (rating === 0) {
    return { color: 'white', icon: BiMehBlank }
  }
  if (rating <= 5.5) {
    return { color: 'pink', icon: BiMeh }
  } else if (rating <= 7.5) {
    return { color: 'green', icon: BiHappy }
  } else {
    return { color: 'blue', icon: BiHappyHeartEyes }
  }
}

export const getYear = (date: string) => {
  const dateYear = date.slice(0, 4)
  if (dateYear === '0000') {
    return 'Unknown'
  }
  return dateYear
}

export const coverArt = (img: string, title: string) => {
  if (img.includes('null')) {
    return `https://via.placeholder.com/350x500.webp?text=${title
      .split(' ')
      .join('+')}`
  }
  return img
}
