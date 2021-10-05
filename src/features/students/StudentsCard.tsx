import React from "react";
import { Student } from "../../types";

const StudentsCard: React.FC<StudentsCardProps> = ({ student, edit }) => {
  const studentsWithData: string[] = [];

  let studentData = "";
  studentData += `Nombre: ${student.Name}\n`;
  studentData += `Apellido: ${student.Surname}\n`;
  studentData += `Grado: ${student.Grade}\n`;
  studentData += `Sección: ${student.Section}\n`;
  studentData += `Código: ${student.Code}\n`;
  studentData += `Cédula: ${student.PublicId}\n`;
  studentData += `Fecha de Nacimiento: ${student.Birthdate.split("T")[0]}\n`;
  studentsWithData.push(studentData);

  return <pre onClick={() => edit()}>{studentData}</pre>;
};

export default StudentsCard;

interface StudentsCardProps {
  student: Student;
  edit: Function;
}
