import { notFound } from "next/navigation";
import TransferRecipientScreen from "@/components/TransferRecipientScreen";
import { getTransferContact } from "@/lib/transferContacts";

interface TransferRecipientPageProps {
  params: {
    contactId: string;
  };
}

export default function TransferRecipientPage({
  params,
}: TransferRecipientPageProps) {
  const contact = getTransferContact(params.contactId);

  if (!contact) {
    notFound();
  }

  return <TransferRecipientScreen contact={contact} />;
}
