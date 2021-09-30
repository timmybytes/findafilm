import { Badge, Icon } from '@chakra-ui/react'
import { getRatingColor } from '@utils/helpers'

type RatingBadgeProps = {
  badge: string
  inner?: boolean
}

export const RatingBadge = ({
  badge,
  inner,
}: RatingBadgeProps): React.ReactElement => {
  const rating = parseFloat(badge)
  const ratingInfo = getRatingColor(rating)
  const badgeProps = {
    d: 'flex',
    top: 0,
    right: 0,
    m: 2,
    rounded: 'md',
    py: 1,
    px: 2,
    colorScheme: rating === 0 ? 'gray' : ratingInfo.color,
  }
  return (
    <Badge
      variant='solid'
      position={inner ? 'initial' : 'absolute'}
      fontSize={inner ? 'xs' : 'md'}
      {...badgeProps}
    >
      {
        // Display top-right corner rating badge with emoji on movie list,
        // or smaller inline badge on modal
        inner
          ? rating > 0
            ? `Average Rating: ${rating}`
            : 'No rating available'
          : rating > 0
          ? rating
          : 'N/A'
      }{' '}
      {!inner && <Icon as={ratingInfo.icon} w={6} h={6} mx={1} />}
    </Badge>
  )
}
