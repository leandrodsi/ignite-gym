import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type ButtonProps = IButtonProps & {
  label: string;
  variant?: "solid" | "outline";
};

export const Button = ({ label, variant = "solid", ...rest }: ButtonProps) => {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.500",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {label}
      </Text>
    </NativeBaseButton>
  );
};
