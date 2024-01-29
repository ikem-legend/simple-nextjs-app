"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  Container,
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useUser from "@/lib/hooks/useUser";
import { User } from "@/lib/types/common";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    values: user ?? { username: "", jobTitle: "" },
  });
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect if no user information is found
      return redirect("/");
    }
  }, [user, isLoading]);

  const updateInfo = (values: User) => {
    setDetailsUpdated(true);
    localStorage.setItem("userData", JSON.stringify(values));
    setTimeout(() => {
      setDetailsUpdated(false);
    }, 1000);
  };

  if (isLoading) {
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
          <Text>Loading...</Text>
        </Box>
      </Container>
    );
  }

  // Display user information
  return (
    <Container flexDirection="column" maxW="full">
      <Box maxW="full">
        <Heading as="h3" fontWeight={700} mb={32} mt={4} textAlign="center">
          User Profile
        </Heading>
        {detailsUpdated && (
          <Box>
            <Text textAlign="right" color="teal">
              Details updated
            </Text>
          </Box>
        )}
        <form onSubmit={handleSubmit(updateInfo)}>
          <SimpleGrid columns={2} spacing={10}>
            <Box h={40}>
              <Card>
                <FormControl isInvalid={!!errors.username}>
                  <CardHeader pb={0}>
                    <FormLabel>
                      <Heading as="h6" fontSize={24}>
                        Username
                      </Heading>
                    </FormLabel>
                  </CardHeader>
                  <CardBody>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...register("username", {
                        required: "Username is required",
                        pattern: {
                          value: /^[a-z0-9!@$&_.]{3,20}$/,
                          message: "Username must be valid",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "Username must not be less than 3 characters",
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
                  </CardBody>
                </FormControl>
              </Card>
            </Box>
            <Box h={40}>
              <Card>
                <FormControl isInvalid={!!errors.jobTitle}>
                  <CardHeader pb={0}>
                    <FormLabel>
                      <Heading as="h6" fontSize={24}>
                        Job Title
                      </Heading>
                    </FormLabel>
                  </CardHeader>
                  <CardBody>
                    <Input
                      id="jobTitle"
                      placeholder="Enter your job title"
                      {...register("jobTitle", {
                        required: "Job title is required",
                        pattern: {
                          value: /^([a-zA-Z]{3,20}|[a-zA-Z]{3,20}[\s])*$/,
                          message: "Job title must be valid",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "Job title must not be less than 3 characters",
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
                  </CardBody>
                </FormControl>
              </Card>
            </Box>
          </SimpleGrid>
          <Button
            mt={4}
            w="25%"
            colorScheme="teal"
            isLoading={isSubmitting}
            loadingText="Submitting"
            isDisabled={!isDirty}
            float="right"
            type="submit"
          >
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
}
