import Form from "@/app/ui/clubs/create-form";
import Breadcrumbs from "@/app/ui/clubs/breadcrumbs";
import { fetchClubs } from "@/app/lib/data";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices Create',
};

export default async function Page() {
  const clubs = await fetchClubs('',3);

  return (
    <main>
      <Breadcrumbs 
        breadcrumbs={[
          { label: 'clubs', href: '/profile/clubs' },
          {
            label: 'Create club',
            href: 'profile/clubs/create',
            active: true,
          },
        ]}
      />
    <Form clubs={clubs} />
    </main>
  );
}