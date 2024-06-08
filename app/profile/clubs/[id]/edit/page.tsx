import Form from '@/app/ui/clubs/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchClubById, fetchJointClubs } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [club] = await Promise.all([
    fetchClubById(id),
    fetchJointClubs(),
  ]);

  if (!club) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clubs', href: '/profile/clubs' },
          {
            label: 'Edit Club',
            href: `/profile/clubs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form club={club} />
    </main>
  );
}