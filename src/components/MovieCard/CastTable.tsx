import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

type CastProps = {
  cast?: [
    {
      name?: string
      character?: string
    }
  ]
}

export const CastTable = ({ cast }: CastProps): React.ReactElement => {
  console.log(cast)
  return (
    <Box>
      {cast && (
        <Table size='sm' overflow='scroll'>
          <Thead>
            <Tr>
              <Th>Cast Member</Th>
              <Th>Character</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cast.map((member, idx) => {
              return (
                <Tr key={idx}>
                  <Td>{member.name}</Td>
                  <Td>{member.character}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
