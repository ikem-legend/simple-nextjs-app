declare module "chakra-ui-steps" {
  type UseSteps = {
    initialStep: number;
  };
  export declare const StepsTheme: any;
  export declare const Step: any;
  export declare const Steps: any;
  export declare const useSteps = ({
    initialStep,
  }: UseSteps): {
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setStep: (step: number) => void;
    activeStep: number;
  } => {};
}
