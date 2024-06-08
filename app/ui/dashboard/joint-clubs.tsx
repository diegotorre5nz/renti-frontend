import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Club } from '@/app/lib/definitions';
export default async function JointClubs({
  clubs,
}: {
  clubs: Club[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Clubs
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        { <div className="bg-white px-6">
          {clubs.map((club, i) => {
            return (
              <div
                key={club.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <p className="truncate text-sm font-semibold md:text-base">
                  {club.name}
                </p>

                <div className="flex items-center">
                  <Image
                    src={'/customers/evil-rabbit.png'}
                    alt={`users's profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      Club Creator
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block text-left">
                    {club.creatorName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
