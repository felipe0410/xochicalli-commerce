import { Button } from "@chakra-ui/react";

const ButtonComponent = ({ fn, name }: { fn: any; name: string }) => {
  return <Button onClick={fn}>{name}</Button>;
};

export default ButtonComponent;
