import { Tabs, TabList, Tab, TabPanel, TabPanels, Text } from '@chakra-ui/react'
import { CastTable } from './CastTable'
import { CrewTable } from './CrewTable'

type DetailTabsProps = {
  children?: React.ReactNode
  description?: string
  cast?: [
    {
      name?: string
      character?: string
      id?: number
    }
  ]
  crew?: [
    {
      name?: string
      job?: string
      id?: number
    }
  ]
}

export const DetailTabs = ({
  cast,
  crew,
  description,
}: DetailTabsProps): React.ReactElement => {
  return (
    <Tabs variant='enclosed' py={4}>
      <TabList>
        <Tab>Description</Tab>
        <Tab>Cast</Tab>
        <Tab>Crew</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text>{description || 'No description available'}</Text>
        </TabPanel>
        {cast && (
          <TabPanel>
            {' '}
            <CastTable cast={cast} />
          </TabPanel>
        )}
        {crew && (
          <TabPanel>
            {' '}
            <CrewTable crew={crew} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}
