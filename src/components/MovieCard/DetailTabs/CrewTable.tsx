import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'

type CrewProps = {
  crew?: [
    {
      name?: string
      job?: string
      id?: number
    }
  ]
}

export const CrewTable = ({ crew }: CrewProps): React.ReactElement => {
  function compare(a, b) {
    if (a.job < b.job) {
      return -1
    }
    if (a.job > b.job) {
      return 1
    }
    return 0
  }

  return (
    <Box>
      {crew && (
        <>
          <Table size='sm' overflow='scroll'>
            <Thead>
              <Tr>
                <Th>Job</Th>
                <Th textAlign='left'>Crew Member</Th>
              </Tr>
            </Thead>
            <Tbody>
              {crew
                .filter(
                  member =>
                    member.job === 'Director' ||
                    member.job === 'Writer' ||
                    member.job === 'Screenplay' ||
                    member.job === 'Story' ||
                    member.job === 'Director of Photography' ||
                    member.job === 'Cinematography' ||
                    member.job === 'Cinematographer' ||
                    member.job === 'Executive Producer' ||
                    member.job === 'Producer'
                )
                .map((member, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{member.job}</Td>
                      <Td textAlign='left'>
                        <Text
                          as='a'
                          fontSize='sm'
                          target='_blank'
                          href={`https://www.themoviedb.org/person/${member.id}`}
                          rel='noreferrer'>
                          {member.name}
                        </Text>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>

          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='center'>
                    Full Crew
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                <Table size='sm' overflow='scroll'>
                  <Thead>
                    <Tr>
                      <Th>Job</Th>
                      <Th textAlign='left'>Crew Member</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {crew
                      .sort(compare)
                      .filter(
                        member =>
                          member.job !== 'Director' &&
                          member.job !== 'Writer' &&
                          member.job !== 'Screenplay' &&
                          member.job !== 'Story' &&
                          member.job !== 'Director of Photography' &&
                          member.job !== 'Cinematography' &&
                          member.job !== 'Cinematographer' &&
                          member.job !== 'Executive Producer' &&
                          member.job !== 'Producer'
                      )
                      .map((member, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{member.job}</Td>
                            <Td textAlign='left'>
                              <Text
                                as='a'
                                fontSize='sm'
                                target='_blank'
                                href={`https://www.themoviedb.org/person/${member.id}`}
                                rel='noreferrer'>
                                {member.name}
                              </Text>
                            </Td>
                          </Tr>
                        )
                      })}
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </Box>
  )
}
