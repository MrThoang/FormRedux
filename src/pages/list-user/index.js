import { useEffect, useRef, useState } from 'react';
import { ApiClient } from '../../config/api';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    RadioGroup,
    Stack,
    Radio,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { fetchUserById } from '../../services/auth';

import { useDispatch, useSelector } from 'react-redux';
import { getListUser, getUserBuyId } from '../../redux/slice/user';


function ListUser() {
    const [listUser, setListUser] = useState([]);
    const [userEdit, setUserEdit] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [valueCheck, setValueCheck] = useState('');
    const [editId, setEditId] = useState('')

    const initialRef = useRef(null);

    const dispatch = useDispatch()

    const stateListUser = useSelector((state) => state)
    const stateUserBuyId = useSelector((state) => state)

    useEffect(() => {
        dispatch(getListUser())
        setListUser(stateListUser?.user?.data?.data)
    }, []);


    const handleEditUser = (id) => {
        if(id) {
          onOpen()
        //   setEditId(id)
        dispatch(getUserBuyId(id))
        }
    }

    // const fetchApiUserById = (userId) => {
    //     fetchUserById(userId)
    //       .then((res) => {
    //           if (res) {
    //             setUserEdit(res?.data);
    //             setValueCheck(userEdit?.gender)
    //             console.log(res);
    //           }
    //       })
    //       .catch((error) => {
    //           console.log(error);
    //       });
    // };

    // useEffect(() => {
    //   fetchApiUserById(editId);
    // }, [editId]);


    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-3xl mb-4">List User</h1>
                <Button>
                    <Link to={'/create'}>Add</Link>
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
                        {listUser?.map((user, index) => {
                            return (
                                <>
                                    <Tr key={index}>
                                        <Td>{`${user?.first_name} ${user?.last_name}`}</Td>
                                        <Td>{user?.gender}</Td>
                                        <Td>{user?.email}</Td>
                                        <Td isNumeric>{user?.phone}</Td>
                                        <Td className="w-[10%]">
                                            <Button onClick={() => handleEditUser(user.id)}>Edit</Button>
                                            <Button>Delete</Button>
                                        </Td>
                                    </Tr>
                                </>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <>
                <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input placeholder="First name" value={userEdit?.first_name} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last name</FormLabel>
                                <Input placeholder="Last name" value={userEdit?.last_name}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup onChange={setValueCheck} value={valueCheck}>
                                    <Stack direction="row">
                                        <Radio value="1">Male</Radio>
                                        <Radio value="2">Female</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Email" value={userEdit?.email}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input placeholder="Phone" value={userEdit?.phone}/>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
}

export default ListUser;
