import { ContentContainer } from "@/components/CustomUi/ContentContainer";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <ContentContainer className="md:mt-32 pt-16 md:pt-8">
      {children}
    </ContentContainer>
  );
}
