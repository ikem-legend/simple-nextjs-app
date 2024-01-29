This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Roboto, a custom Google Font.

## Implementation

This document will walk you through the implementation of the multi-step form feature and the information display feature in our application.

The multi-step form feature allows users to input their details in a step-by-step manner, enhancing user experience by breaking down a potentially long form into smaller, manageable sections. The information display feature fetches data from an external API and displays it in a table format, with the ability to view more details in a modal.

We will cover:

1. The design decision behind the multi-step form and how it was implemented.

1. The design decision behind the information display feature and how it was implemented.

1. The use of context to manage state across components.

1. The use of Apollo Client for data fetching.

## Multi-step form feature

### Setting up the form

The multi-step form feature is implemented using two main components: `NameForm` and `JobForm`. These components are responsible for collecting the user's name and job title respectively.

---

In NameForm, we define the form fields and validation rules using the react-hook-form library.

```tsx

export type UsernameFormValues = { username: string };

export default function NameForm() {
  const { next, multiStepData } = useContext(MultiStepContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormValues>({ defaultValues: multiStepData });
```

---

Form validation is added along with error feedback. The form values are then passed to the next function from the MultiStepContext when the form is submitted.

```tsx
function onSubmit(values: UsernameFormValues) {
  next?.(values);
}
```

---

Similarly, in JobForm, we define the form fields and validation rules. However, in this case, the form values are stored in the local storage when the form is submitted. This is done to persist the user's data across sessions.

```tsx

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
```

---

&nbsp;

```tsx
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
```

### Managing state across components

To manage state across the NameForm and JobForm components, we use the MultiStepContext. This context provides the prev and next functions, which are used to navigate between the form steps and update the form data.

```tsx
export const MultiStepContext = createContext<MultiStepProps>({
  prev: () => {},
  next: () => {},
  className: "",
  multiStepData: {},
});
```

---

The MultiStep component is responsible for managing the state of the multi-step form. It uses the useSteps hook from the chakra-ui-steps library to manage the active step and navigation between steps. The form data is stored in the multiStepData state variable, which is updated whenever the prev or next function is called.

```tsx

// MultiStep has local state which is modified on next and previous
// State is available to children to read
// On submit, state can then be transformed as necessary
export default function MultiStep({ children, className }: ComponentProps) {
  const [multiStepData, setMultiStepData] = useState({});
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
```

---

&nbsp;

```tsx
function prev(data: any) {
  prevStep();
  const updatedData = {
    ...multiStepData,
    ...data,
  };
  setMultiStepData(updatedData);
}
```

---

&nbsp;

```tsx
function next(data: any) {
  nextStep();
  const updatedData = { ...multiStepData, ...data };
  setMultiStepData(updatedData);
}

const props = { prev, next, className, multiStepData };
```

---

&nbsp;

Each child of the MultiStep is wrapped in a Step with props passed down to the children via the MultiStepContext

```tsx

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
```

---

## Information display feature

### Fetching data

---

The information display feature fetches data from the Rick and Morty API using the GET_CHARACTERS query. This query is executed in the InformationPage component using the useQuery hook from the @apollo/client library.

```typescript
import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
      }
      results {
        name
        id
        status
        species
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;
```

---

&nbsp;

```tsx
const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
  variables: { page: 1 },
});

const displayDetails = (detailsData: InformationData) => {
  setModalData(detailsData);
  onOpen();
};
```

---

## Displaying data

---

The fetched data is displayed in a table using the TableWrapper component. Each row in the table is represented by the InformationRow component, which receives the row data and a callback function to display more details in a modal.

```tsx
import { Table, Thead, Tbody, TableContainer } from "@chakra-ui/react";
import TableHeader from "./Header";

type TableWrapperProps = {
  headers: { title: string }[];
  hideHeader?: boolean;
  data: any[];
  Row: React.ComponentType<{ data: any; onRowClick: (data: any) => void }>;
  onRowClick: (data: any) => void;
};
```

---

&nbsp;

```tsx
export default function TableWrapper({
  headers,
  hideHeader = false,
  Row,
  onRowClick,
  data,
}: TableWrapperProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        {!hideHeader && (
          <Thead>
            <TableHeader headers={headers} />
          </Thead>
        )}
        <Tbody>
          {data.map((rowData, index) => (
            <Row key={index} data={rowData} onRowClick={onRowClick} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
```

---

&nbsp;

```tsx

  return (
    <Container flexDirection="column" maxW="full">
      <Box maxW="full">
        <Box p={2}>
          <Heading as="h6" textAlign="center">
            Rick and Morty characters
          </Heading>
        </Box>
        <TableWrapper
          headers={headers}
          Row={InformationRow}
          onRowClick={displayDetails}
          data={data.characters.results}
        />
        <InformationModal
          isOpen={isOpen}
          onClose={onClose}
          data={modalData}
          header="Character details"
        />
      </Box>
    </Container>
  );
}
```

---

When a row is clicked, the displayDetails function is called with the row data as an argument. This function updates the modalData state variable and opens the modal.

```tsx
const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
  variables: { page: 1 },
});

const displayDetails = (detailsData: InformationData) => {
  setModalData(detailsData);
  onOpen();
};
```

---

The InformationModal component is responsible for displaying the details of a character in a modal. It receives the character data and a callback function to close the modal as props.

```tsx
export default function InformationModal({
  isOpen,
  onClose,
  data,
  header,
}: InformationModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} header={header} size="xl">
      <SimpleGrid columns={2} spacing={10}>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Name</Text>
          <Text>{data.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Status</Text>
          <Text>{data.status}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Species: {data.species}</Text>
          <Text>{data.species}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Location</Text>
          <Text>{data.location.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Origin</Text>
          <Text>{data.origin.name}</Text>
        </Box>
      </SimpleGrid>
    </ModalWrapper>
  );
}
```

---

&nbsp;

```tsx
export default function ModalWrapper({
  header,
  children,
  footer,
  isOpen,
  onClose,
  size = "md",
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
      {!!footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}
```

---

&nbsp;

```tsx

  return (
    <Container flexDirection="column" maxW="full">
      <Box maxW="full">
        <Box p={2}>
          <Heading as="h6" textAlign="center">
            Rick and Morty characters
          </Heading>
        </Box>
        <TableWrapper
          headers={headers}
          Row={InformationRow}
          onRowClick={displayDetails}
          data={data.characters.results}
        />
        <InformationModal
          isOpen={isOpen}
          onClose={onClose}
          data={modalData}
          header="Character details"
        />
      </Box>
    </Container>
  );
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
