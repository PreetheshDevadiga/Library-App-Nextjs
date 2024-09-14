import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { fetchMember } from "../../../lib/action"
import { SearchBar } from "../../../components/home/search"
import PaginationControls from '../../../components/home/pagination';
import { DeleteMember } from '../../../components/admin/members/deleteMember';
import { AddMember } from '../../../components/admin/members/addMember';

async function MemberTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;

  const MemberResponse = await fetchMember(query, limit, offset);
  const memberList = MemberResponse?.items || [];
  const totalMembers = Number(MemberResponse?.pagination.total);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end items-center mb-4">

        <AddMember />
      </div>
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalMembers > 0 ? (
              memberList.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.address}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                        <DeleteMember memberId={member.id} memberName={`${member.firstName} ${member.lastName}`}/>
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-black">
                  No Member found for `{query}`
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalMembers > 0 && (
        <div className="mt-4">
          <PaginationControls totalBooks={totalMembers} limit={limit} />
        </div>
      )}
    </div>
  );
}

export default MemberTable;
