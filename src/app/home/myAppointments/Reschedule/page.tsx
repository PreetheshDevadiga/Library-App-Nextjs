import React from "react";
import CalendlyWidget from "../../../../components/calendly/calendlyInlineWidget"

export default function RescheduleAppointment({searchParams,}:{searchParams?:{url:string}}){
    const url=searchParams?.url;
    console.log("url",url);
    return(
        <CalendlyWidget
            calendlyUrl={url!} professorName={""} clientName={""} clientEmail={""}      />
    )
}