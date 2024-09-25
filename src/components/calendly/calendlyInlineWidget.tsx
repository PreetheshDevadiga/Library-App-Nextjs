"use client";
import React from "react";
import { InlineWidget } from "react-calendly";

interface CalendlyWidgetProps {
  calendlyUrl: string;
  professorName: string;
  clientName: string;
  clientEmail: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  calendlyUrl,
  professorName,
  clientEmail,
  clientName,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#0D2E4B] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
        Book an Appointment with {professorName}
      </h2>
      <div className="calendly-inline-widget rounded-lg overflow-hidden">
        <InlineWidget
          url={calendlyUrl}
          styles={{
            height: "650px",
          }}
          pageSettings={{
            backgroundColor: "f5f5f5",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "00D4FF",
            textColor: "0A2540",
          }}
          prefill={{
            name: clientName,
            email: clientEmail,
          }}
        />
      </div>
    </div>
  );
};

export default CalendlyWidget;
