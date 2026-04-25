export type TransferContact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  recent?: boolean;
  note?: string;
  penipuSourceUrl?: string;
};

export const TRANSFERABLE_BALANCE_MYR = 100;

export const transferContacts: TransferContact[] = [
  {
    id: "aina-florist",
    name: "Aina Florist",
    phone: "0172223344",
    initials: "AF",
    recent: true,
    note: "Saved merchant",
  },
  {
    id: "mum",
    name: "Mum",
    phone: "0128877665",
    initials: "M",
    recent: true,
    note: "Family",
  },
  {
    id: "dad",
    name: "Dad",
    phone: "0195566778",
    initials: "D",
    recent: true,
    note: "Family",
  },
  {
    id: "scammer",
    name: "Scammer",
    phone: "0121234567",
    initials: "S",
    note: "Flagged in a verified PenipuMY report",
    penipuSourceUrl: "https://penipu.my/report/view/150",
  },
];

export const getTransferContact = (contactId: string) =>
  transferContacts.find((contact) => contact.id === contactId);

export const formatMalaysiaPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("60")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+60${digits.slice(1)}`;
  }

  return phone;
};

export const groupContactsByInitial = (contacts: TransferContact[]) =>
  contacts.reduce<Record<string, TransferContact[]>>((groups, contact) => {
    const initial = contact.name.charAt(0).toUpperCase();

    if (!groups[initial]) {
      groups[initial] = [];
    }

    groups[initial].push(contact);
    return groups;
  }, {});
