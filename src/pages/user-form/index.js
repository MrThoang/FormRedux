import {
  Input, 
  FormLabel,
  FormErrorMessage, 
  FormControl,
  Button,
  RadioGroup,
  Stack,
  Radio
} from '@chakra-ui/react'
import { useState } from 'react';

function UserForm() {
  const [value, setValue] = useState('1')

  return (
    <div className='w-[600px] m-auto shadow-2xl rounded-lg mt-4'> 
      <form className='formUser p-8'>
        <h1 className='text-3xl text-center'>Create User</h1>
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input placeholder='First name' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input placeholder='Last name' />
        </FormControl>
        <FormControl isRequired>
        <FormLabel>Gender</FormLabel>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
              <Radio value='1'>Male</Radio>
              <Radio value='2'>Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='Email' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input placeholder='Phone' />
        </FormControl>
        <div className='flex justify-center'>
          <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Submit
          </Button>
        </div>
      </form>
  </div> 
  );
}

export default UserForm;