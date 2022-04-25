import { Button as ButtonChakra,ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IButtonProps extends ButtonProps {
  children?: ReactNode;
}

function Button({ children, ...props }: IButtonProps) {
  return (
    <ButtonChakra {...props} colorScheme="teal" size="md">
      {children}
    </ButtonChakra>
  );
}

export default Button;
