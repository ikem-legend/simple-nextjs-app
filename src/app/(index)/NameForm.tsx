"use client";

import { useContext } from "react";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MultiStepContext } from "@/components/MultiStep";

export type UsernameFormValues = { username: string };

export default function NameForm() {
  const { next, multiStepData } = useContext(MultiStepContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormValues>({ defaultValues: multiStepData });

  function onSubmit(values: UsernameFormValues) {
    next?.(values);
  }

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl w={400} isInvalid={!!errors.username}>
            <FormLabel htmlFor="username" fontWeight={600}>
              Username
            </FormLabel>
            <Input
              id="username"
              placeholder="Enter your username"
              autoFocus
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-z0-9!@$&_.]{3,20}$/,
                  message: "Username must be valid",
                },
                minLength: {
                  value: 3,
                  message: "Username must not be less than 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            <FormErrorMessage>
              <>{errors?.username?.message}</>
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            w="25%"
            colorScheme="teal"
            isLoading={isSubmitting}
            float="right"
            type="submit"
          >
            Next
          </Button>
        </form>
      </Box>
    </Container>
  );
}
