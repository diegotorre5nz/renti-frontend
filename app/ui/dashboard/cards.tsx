import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  name,
  email,
  dateOfBirth,
}: {
  name: string;
  email: number | string;
  dateOfBirth: number | string;
}) {
  const Icon = iconMap['customers'];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
      <Image
            src='/customers/jared-palmer.png'
            className="rounded-full"
            width={28}
            height={28}
            alt={`users's profile picture`}
          />
        <h3 className="truncate text-sm font-semibold md:text-base">{name}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-sm md:text-base">
        Email: {email}
      </p>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-sm md:text-base">
        Date of Birth: {dateOfBirth.toString().substring(0,10)}
      </p>
    </div>
  );
}
