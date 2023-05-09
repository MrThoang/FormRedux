import { useEffect, useState } from "react";
import { ApiClient } from "../../config/api";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

function ListUser() {
  const [listUser, setListUser] = useState();

  const fetchApi = () => {
    ApiClient.get('/user')
      .then((res) => {
        if(res) {
          console.log(res)
          setListUser(res)
        }
      })
  }

  useEffect(() => {
    fetchApi()
  },[])


  return ( 
    <div className="p-8">
      <h1 className="text-3xl mb-4">List User</h1>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Gender</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td >25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
   );
}

export default ListUser;