import React from "react";
import { Student } from "../../types";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentsCard: React.FC<StudentsCardProps> = ({
  student,
  editStudent,
  deleteStudent,
}) => {
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

  return (
    <div>
      <pre>{studentData}</pre>
      <FaEdit onClick={() => editStudent()} />
      <FaTrash onClick={() => deleteStudent()} />
    </div>
  );
};

export default StudentsCard;

interface StudentsCardProps {
  student: Student;
  editStudent: Function;
  deleteStudent: Function;
}
