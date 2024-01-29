"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
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

export type JobFormValues = { jobTitle: string };

export default function JobForm() {
  const router = useRouter();
  const { prev, multiStepData } = useContext(MultiStepContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<JobFormValues>({ defaultValues: multiStepData });
  const formValues = watch();

  function onPrevious() {
    prev?.(formValues);
  }

  function onSubmit(values: JobFormValues) {
    const updatedData = {
      ...multiStepData,
      ...values,
    };
    localStorage.setItem("userData", JSON.stringify(updatedData));
    new Promise((resolve) =>
      setTimeout(() => resolve(router.push("/profile")), 2000)
    );
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
          <FormControl w={400} isInvalid={!!errors.jobTitle}>
            <FormLabel htmlFor="job-title" fontWeight={600}>
              Job title
            </FormLabel>
            <Input
              id="jobTitle"
              placeholder="Enter your job title"
              autoFocus
              {...register("jobTitle", {
                required: "Job title is required",
                pattern: {
                  value: /^([a-zA-Z]{3,20}|[a-zA-Z]{3,20}[\s])*$/,
                  message: "Job title must be between 3 and 20 characters",
                },
                minLength: {
                  value: 3,
                  message: "Job title must not be less than 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Job title must not exceed 20 characters",
                },
              })}
            />
            <FormErrorMessage>
              <>{errors?.jobTitle?.message}</>
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            w="25%"
            colorScheme="teal"
            onClick={onPrevious}
            type="button"
          >
            Prev
          </Button>
          <Button
            mt={4}
            w="25%"
            colorScheme="teal"
            isLoading={isSubmitting}
            loadingText="Submitting"
            float="right"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
