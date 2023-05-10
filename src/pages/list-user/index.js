import { useEffect, useState } from 'react';
import { ApiClient } from '../../config/api';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ListUser() {
    const [listUser, setListUser] = useState([]);

    const fetchApi = () => {
        ApiClient.get('/user')
        .then((res) => {
            if (res) {
                setListUser(res?.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className="p-8">
            <div className='flex justify-between'>
              <h1 className="text-3xl mb-4">List User</h1>
              <Button>
                <Link to={'/create'}>
                  Add
                </Link>
              </Button>
            </div>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>User Name</Th>
                            <Th>Gender</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listUser?.map((user) => {
                            return (
                                <>
                                    <Tr>
                                        <Td>{`${user?.first_name} ${user?.last_name}`}</Td>
                                        <Td>{user?.gender}</Td>
                                        <Td>{user?.email}</Td>
                                        <Td isNumeric>{user?.phone}</Td>
                                        <Td className='w-[10%]'>
                                          <Button>
                                            Edit
                                          </Button>
                                          <Button>
                                            Delete
                                          </Button>
                                        </Td>
                                    </Tr>
                                </>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListUser;
