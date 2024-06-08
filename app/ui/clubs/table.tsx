import Image from 'next/image';
import { UpdateClub, DeleteClub } from '@/app/ui/clubs/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchClubs } from '@/app/lib/data';

export default async function ClubsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clubs = await fetchClubs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {clubs?.map((club) => (
              <div
                key={club.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src="/customers/evil-rabbit.png"
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`user's profile picture`}
                      />
                      <p>{club.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{club.creatorName}</p>
                  </div>
                  <InvoiceStatus status={club.isJoint} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{club.createdAt.toString().substring(0,10)}</p>
                  </div>
                    <div className="flex justify-end gap-2">
                      <UpdateClub id={club.id} hide={club.userIsCreator} />
                      <DeleteClub id={club.id} hide={!club.userIsCreator} />
                    </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Club Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Following
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clubs?.map((club) => (
                <tr
                  key={club.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src='/customers/evil-rabbit.png'
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`users's profile picture`}
                      />
                      <p>{club.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {club.creatorName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {club.createdAt.toString().substring(0,10)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={club.isJoint} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <UpdateClub id={club.id} hide={!club.userIsCreator} />
                      <DeleteClub id={club.id} hide={!club.userIsCreator} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
