import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
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
  return (
    <Box>
      {crew && (
        <Table size='sm' overflow='scroll'>
          <Thead>
            <Tr>
              <Th>Job</Th>
              <Th>Crew Member</Th>
            </Tr>
          </Thead>
          <Tbody>
            {crew.map((member, idx) => {
              return (
                <Tr key={idx}>
                  <Td>{member.job}</Td>
                  <a
                    target='_blank'
                    href={`https://www.themoviedb.org/person/${member.id}`}
                    rel='noreferrer'
                  >
                    {member.name}
                  </a>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
