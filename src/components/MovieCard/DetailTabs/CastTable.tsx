import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

type CastProps = {
  cast?: [
    {
      name?: string
      character?: string
      id?: number
    }
  ]
}

export const CastTable = ({ cast }: CastProps): React.ReactElement => {
  return (
    <Box>
      {cast && (
        <Table size='sm' overflow='scroll'>
          <Thead>
            <Tr>
              <Th>Character</Th>
              <Th>Cast Member</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cast.map((member, idx) => {
              return (
                <Tr key={idx}>
                  <Td>{member.character}</Td>
                  <Td>
                    <a
                      target='_blank'
                      href={`https://www.themoviedb.org/person/${member.id}`}
                      rel='noreferrer'
                    >
                      {member.name}
                    </a>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
