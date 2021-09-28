import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

type CastProps = {
  cast: [
    {
      name: string
      character: string
    }
  ]
}

export const CastTable = ({ cast }: CastProps) => {
  return (
    <Box py={4}>
      {cast && (
        <Table size='sm' overflow='scroll'>
          <Thead>
            <Tr>
              <Th>Cast Member</Th>
              <Th>Character</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cast.map((member: any, idx: any) => {
              member.name
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
