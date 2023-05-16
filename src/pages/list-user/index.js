import { useEffect, useMemo, useRef, useState } from 'react';
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

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUserApi, editUserApi, getListUser } from '../../redux/apiRequests';
import { useFormik } from 'formik';

function ListUser() {
    const [userEdit, setUserEdit] = useState();
    const [userDelete, setUserDelete] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
    const [valueCheck, setValueCheck] = useState();

    const initialRef = useRef(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state?.user);

    const fetchApiList = () => {
        getListUser(dispatch);
    };

    useEffect(() => {
        fetchApiList();
    }, []);

    const listUser = useMemo(() => user?.data, [user?.data]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        onSubmit: (values) => {
            if (values) {
                const payload = {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.email,
                    gender: valueCheck,
                    phone: values.phone,
                };
                editUserApi(userEdit.id, payload, () => {
                    fetchApiList();
                });
                onClose()
            }
        },
    });

    const handleEditUser = (id) => {
        if (id) {
            onOpen();
            const user = listUser?.find((user) => user.id === id);
            setUserEdit(user);
            setValueCheck(user?.gender);
            console.log(valueCheck);
        }
    };

    useEffect(() => {
        if(userEdit) {
            formik.setValues({
            firstName: userEdit.first_name,
            lastName: userEdit.last_name,
            email: userEdit.email,
            phone: userEdit.phone,
        });
        }
    },[userEdit])

    const handleConfirmDelete = (userId) => {
        onOpenConfirm();
        setUserDelete(userId);
    };

    const handleDelete = () => {
        if (userDelete) {
            onCloseConfirm();
            deleteUserApi(userDelete, () => fetchApiList());
            setUserDelete('');
        }
    };

    const handleCancelDelete = () => {
        onCloseConfirm();
        setUserDelete('');
    };

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-3xl mb-4">List User</h1>
                <Link to={'/create'}>
                    <Button colorScheme='teal' size='md'> 
                        Add
                    </Button>
                </Link>
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
                                        <Td>{user?.gender === '1' ? 'Male' : 'Female'}</Td>
                                        <Td>{user?.email}</Td>
                                        <Td isNumeric>{user?.phone}</Td>
                                        <Td className="w-[10%]">
                                            <div className="flex gap-2">
                                                <Button onClick={() => handleEditUser(user.id)}>
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={() => handleConfirmDelete(user.id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
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
                            <form onSubmit={formik.handleSubmit}>
                        <ModalHeader>Edit User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                                <FormControl isRequired>
                                    <FormLabel>First name</FormLabel>
                                    <Input
                                        name="firstName"
                                        value={formik.values.firstName}
                                        type="text"
                                        onChange={formik.handleChange}
                                        placeholder="First name"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Last name</FormLabel>
                                    <Input
                                        name="lastName"
                                        value={formik.values.lastName}
                                        type="text"
                                        onChange={formik.handleChange}
                                        placeholder="Last name"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup onChange={setValueCheck} value={valueCheck}>
                                        <Stack direction="row">
                                            <Radio value="1">Male</Radio>
                                            <Radio value="2">Female</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        value={formik.values.email}
                                        type="text"
                                        onChange={formik.handleChange}
                                        placeholder="Email"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                        name="phone"
                                        value={formik.values.phone}
                                        type="text"
                                        onChange={formik.handleChange}
                                        placeholder="Phone"
                                    />
                                </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                            </form>
                    </ModalContent>
                </Modal>
            </>
            <>
                <Modal initialFocusRef={initialRef} isOpen={isOpenConfirm} onClose={handleCancelDelete}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm notification</ModalHeader>
                        <ModalBody pb={6}>
                            <p>Are you sure you want to delete this user</p>
                        </ModalBody>

                        <ModalFooter className="flex gap-4">
                            <Button onClick={() => handleCancelDelete()}>Cancel</Button>
                            <Button onClick={() => handleDelete()} colorScheme="red" mr={3}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
}

export default ListUser;
