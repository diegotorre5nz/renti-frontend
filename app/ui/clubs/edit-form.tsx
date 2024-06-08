'use client';

import { Club } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateClub } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Image from 'next/image';

export default function EditClubForm({
  club,
}: {
  club: Club
}) {
  const initialState = { message: null, errors: {} };
  const updateClubWithId = updateClub.bind(null, club.id);
  const [state, dispatch] = useFormState(updateClubWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter the Name of the Club
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={club.name}
                placeholder="Enter the name of the club"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              />
            </div>
          </div>
        </div>
        {/* Club Joined */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Club status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="isNotJoint"
                  name="status"
                  type="radio"
                  value="isNotJoint"
                  defaultChecked={!club.isJoint}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="customer-error"
                />
                <label
                  htmlFor="isNotJoint"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Unfollowed <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="isJoint"
                  name="status"
                  type="radio"
                  value="isJoint"
                  defaultChecked={club.isJoint}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="isJoint"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Following <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="mb-4">
          <label htmlFor="created" className="mb-2 block text-sm font-medium">
            Created:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="created"
                defaultValue={club.createdAt.toString().substring(0, 10)}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="updated" className="mb-2 block text-sm font-medium">
            Updated
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="updated"
                defaultValue={club.updatedAt.toString().substring(0, 10)}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/profile/clubs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Club</Button>
      </div>
    </form>
  );
}
