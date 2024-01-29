"use client";

import { useState } from "react";
import { ReactElement, Children, cloneElement, createContext } from "react";
import { Box } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

type ComponentProps = { children: ReactElement[]; className?: string };

type MultiStepProps = {
  prev?(data: any): void;
  next?(data: any): void;
  className?: string;
  multiStepData: {};
};

export const MultiStepContext = createContext<MultiStepProps>({
  prev: () => {},
  next: () => {},
  className: "",
  multiStepData: {},
});

// MultiStep has local state which is modified on next and previous
// State is available to children to read
// On submit, state can then be transformed as necessary
export default function MultiStep({ children, className }: ComponentProps) {
  const [multiStepData, setMultiStepData] = useState({});
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  function prev(data: any) {
    prevStep();
    const updatedData = {
      ...multiStepData,
      ...data,
    };
    setMultiStepData(updatedData);
  }

  function next(data: any) {
    nextStep();
    const updatedData = { ...multiStepData, ...data };
    setMultiStepData(updatedData);
  }

  const props = { prev, next, className, multiStepData };

  function renderChildren() {
    return Children.map(children, (child, index) =>
      cloneElement(<Step key={index}>{child}</Step>)
    );
  }

  return (
    <Box m={8} maxW="full">
      <MultiStepContext.Provider value={{ ...props }}>
        <Steps activeStep={activeStep} display="none">
          {renderChildren()}
        </Steps>
      </MultiStepContext.Provider>
    </Box>
  );
}
