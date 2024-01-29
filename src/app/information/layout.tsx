import PrivateLayout from "../profile/layout";

export default function InformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
