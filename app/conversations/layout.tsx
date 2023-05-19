import Sidebar from "../components/sidebar/Sidebar";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //@ts-expect-error server component
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
}
