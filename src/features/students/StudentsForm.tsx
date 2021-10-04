import { useState } from "react";
import { useDispatch } from "react-redux";
import { grades, sections } from "../../constants";
import { Student } from "../../types";
import { createStudent } from "./studentsSlice";

const StudentsForm: React.FC<StudentFormProps> = ({ student, zeroStudent }) => {
  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState<Student>(student);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditingStudent((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStudent = { ...editingStudent };
    const date = new Date(newStudent.Birthdate);
    newStudent.Birthdate = date.toISOString();
    console.log(newStudent);
    dispatch(createStudent(newStudent));
    setEditingStudent(zeroStudent);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="Name">
        Nomber:
        <input
          type="text"
          name="Name"
          onChange={(e) => handleChange(e)}
          value={editingStudent.Name}
        />
      </label>
      <label htmlFor="Surname">
        Apellidos:
        <input
          type="text"
          name="Surname"
          onChange={(e) => handleChange(e)}
          value={editingStudent.Surname}
        />
      </label>
      <label htmlFor="PublicId">
        Cédula:
        <input
          type="text"
          name="PublicId"
          onChange={(e) => handleChange(e)}
          value={editingStudent.PublicId}
        />
      </label>
      <label htmlFor="Code">
        Código:
        <input
          type="text"
          name="Code"
          onChange={(e) => handleChange(e)}
          value={editingStudent.Code}
        />
      </label>
      <label htmlFor="Birthdate">
        Fecha de Nacimiento:
        <input
          type="date"
          name="Birthdate"
          value={editingStudent.Birthdate}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Grade">
        Grado:
        <select name="Grade" onChange={(e) => handleChange(e)}>
          {grades.map((grade, i) => (
            <option key={i} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="Section">
        Sección:
        <select name="Section" onChange={(e) => handleChange(e)}>
          {sections.map((section, i) => (
            <option key={i} value={section}>
              {section}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

interface StudentFormProps {
  student: Student;
  zeroStudent: Student;
}

export default StudentsForm;
