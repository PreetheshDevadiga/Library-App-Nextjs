import React from 'react';
import ProfessorCard from '../../../components/professors/professorCard';
import { fetchProfessor } from "../../../lib/action";

export default async function Professor(){
    
    const allProffesors = await fetchProfessor();

    return(
        <div className="min-h-screen bg-[#0A2540] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
        Our Professors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProffesors?.map((professor) => (
          <ProfessorCard
            key={professor.id}
            id={professor.id}
            name={professor.name}
            department={professor.department}
            bio={professor.shortBio}
          />
        ))}
      </div>
    </div>
    )
}