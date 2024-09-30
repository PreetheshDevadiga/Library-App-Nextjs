import React from "react";
import CalendlyWidget from "../../../../../components/calendly/calendlyInlineWidget";
import {
  fetchProfessorById,
  fetchUserDetails,
} from "../../../../../lib/action";

export default async function CalendlyPage({
  params,
}: {
  params: { id: string };
}) {
  const professorsDetails = await fetchProfessorById(Number(params.id));
  const clientDetails = await fetchUserDetails();

  return (
    <>
      <CalendlyWidget
        calendlyUrl={professorsDetails!.calendlylink as string}
        professorName={professorsDetails!.name}
        clientName={clientDetails!.userDetails.firstName}
        clientEmail={clientDetails!.userDetails.email}
      />
    </>
  );
}
