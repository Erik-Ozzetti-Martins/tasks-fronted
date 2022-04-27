import { FormControl, FormLabel, Input as ChakraInput, Text } from '@chakra-ui/react';
interface InputProps {
  label:string;
  type:string;
  name:string;
  value:string;
  onChange:any;
  error:any;
  onBlur:any;
  placeholder?: string

}
export function Input({ label, type, name, value, onChange, error, onBlur, placeholder }:InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel ml="1" htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        type={type}
        id={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        focusBorderColor="pink.500"
        bgColor="white"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        mb="2"
        size="md"
      />
      {error && <Text ml="2"color="red.400">{error}</Text>}
    </FormControl>
  );
}


