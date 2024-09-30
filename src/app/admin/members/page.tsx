import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMember } from "@/lib/action";
import { SearchBar } from "@/components/home/search";
import PaginationControls from "@/components/home/pagination";
import { DeleteMember } from "@/components/admin/members/deleteMember";
import { AddMember } from "@/components/admin/members/addMember";
import RoleDropdown from "@/components/admin/members/roleDropDown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="container mx-auto px-4 py-8 bg-[#0A2540]">
      <Card className="bg-[#1A1F36] border-[#2D3348] shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold text-white">All Members</CardTitle>
          <AddMember />
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2D3348] hover:bg-[#242B42]">
                  <TableHead className="w-[150px] text-[#A3ACBF]">First Name</TableHead>
                  <TableHead className="text-[#A3ACBF]">Last Name</TableHead>
                  <TableHead className="text-[#A3ACBF]">Phone</TableHead>
                  <TableHead className="text-[#A3ACBF]">Address</TableHead>
                  <TableHead className="text-[#A3ACBF]">Email</TableHead>
                  <TableHead className="text-center text-[#A3ACBF]">Role</TableHead>
                  <TableHead className="text-center text-[#A3ACBF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totalMembers > 0 ? (
                  memberList.map((member) => (
                    <TableRow key={member.id} className="border-b border-[#2D3348] hover:bg-[#242B42]">
                      <TableCell className="font-medium text-white">{member.firstName}</TableCell>
                      <TableCell className="text-white">{member.lastName}</TableCell>
                      <TableCell className="text-white">{member.phone}</TableCell>
                      <TableCell className="text-white">{member.address}</TableCell>
                      <TableCell className="text-white">{member.email}</TableCell>
                      <TableCell className="text-center">
                        <RoleDropdown memberId={member.id} memberRole={member.role} />
                      </TableCell>
                      <TableCell className="text-center">
                        <DeleteMember
                          memberId={member.id}
                          memberName={`${member.firstName} ${member.lastName}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-[#A3ACBF]">
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
        </CardContent>
      </Card>
    </div>
  );
}

export default MemberTable;