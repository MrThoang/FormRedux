import { Input, FormLabel, FormControl, Button, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { useState } from 'react';
import { createUserApi } from '../../redux/apiRequests';
import { useNavigate } from 'react-router-dom';

function UserForm() {
    const [valueGender, setValueGender] = useState('1');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = e.target;
        if (e.type === 'submit') {
            const payload = {
              first_name: values.first_name.value,
              last_name: values.last_name.value,
              email: values.email.value, 
              gender: valueGender,
              phone: values.phone.value,
            };
            createUserApi(payload, navigate('/list-user'))
        }
    };

    return (
        <div className="w-[600px] m-auto shadow-2xl rounded-lg mt-4">
            <form onSubmit={handleSubmit} className="formUser p-8">
                <h1 className="text-3xl text-center">Create User</h1>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input name="first_name" placeholder="First name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input name="last_name" placeholder="Last name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={setValueGender} value={valueGender}>
                        <Stack direction="row">
                            <Radio value="1">Male</Radio>
                            <Radio value="2">Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" placeholder="Email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input name="phone" placeholder="Phone" />
                </FormControl>
                <div className="flex justify-center">
                    <Button mt={4} colorScheme="teal" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;