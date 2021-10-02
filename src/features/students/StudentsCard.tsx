import React from "react";
import { Student } from "../../types";

const StudentsCard: React.FC<StudentsCardProps> = ({ students }) => {
  const studentsWithData: string[] = [];

  for (let i = 0; i < students.length; i++) {
    let studentData = "";
    studentData += `Nombre: ${students[i].Name}\n`;
    studentData += `Apellido: ${students[i].Surname}\n`;
    students[i].Grade && (studentData += `Grado: ${students[i].Grade}\n`);
    studentData += `Sección: ${students[i].Section}\n`;
    studentData += `Código: ${students[i].Code}\n`;
    studentsWithData.push(studentData);
  }

  return (
    <div>
      {studentsWithData.map((student, i) => (
        <pre key={i}>{student}</pre>
      ))}
    </div>
  );
};

export default StudentsCard;

interface StudentsCardProps {
  students: Student[];
}
