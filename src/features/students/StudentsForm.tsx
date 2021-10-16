import { useRef } from "react";
import { useDispatch } from "react-redux";
import { grades, sections } from "../../constants";
import { Student } from "../../types";
import { createStudent, updateStudent } from "./studentsSlice";

const StudentsForm: React.FC<StudentFormProps> = ({
  student,
  resetStudent,
  closeModal,
}) => {
  const refName = useRef<HTMLInputElement | null>(null);
  const refSurname = useRef<HTMLInputElement | null>(null);
  const refPublicId = useRef<HTMLInputElement | null>(null);
  const refCode = useRef<HTMLInputElement | null>(null);
  const refBirthdate = useRef<HTMLInputElement | null>(null);
  const refGrade = useRef<HTMLSelectElement | null>(null);
  const refSection = useRef<HTMLSelectElement | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStudent: Student = {
      Id: student.Id,
      Name: refName.current?.value || "",
      Surname: refSurname.current?.value || "",
      PublicId: refPublicId.current?.value || "",
      Code: refCode.current?.value || "",
      Birthdate: refBirthdate.current?.value || "",
      Grade: refGrade.current?.value || "",
      Section: refSection.current?.value || "",
      Photo: "",
    };
    const date = new Date(newStudent.Birthdate);
    newStudent.Birthdate = date.toISOString();

    if (newStudent.Id === 0) {
      dispatch(createStudent(newStudent));
    } else {
      dispatch(updateStudent(newStudent));
    }
    resetStudent();
    closeModal();
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  // console.log(refName.current?.value);
  // console.log(refSurname.current?.value);
  // console.log(refPublicId.current?.value);
  // console.log(refCode.current?.value);
  // console.log(refBirthdate.current?.value);
  // console.log(refGrade.current?.value);
  // console.log(refSection.current?.value);
  // };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="Name">
        Nomber:
        <input
          type="text"
          name="Name"
          ref={refName}
          defaultValue={student.Name}
        />
      </label>
      <label htmlFor="Surname">
        Apellidos:
        <input
          type="text"
          name="Surname"
          ref={refSurname}
          defaultValue={student.Surname}
        />
      </label>
      <label htmlFor="PublicId">
        Cédula:
        <input
          type="text"
          name="PublicId"
          ref={refPublicId}
          defaultValue={student.PublicId}
        />
      </label>
      <label htmlFor="Code">
        Código:
        <input
          type="text"
          name="Code"
          ref={refCode}
          defaultValue={student.Code}
        />
      </label>
      <label htmlFor="Birthdate">
        Fecha de Nacimiento:
        <input
          type="date"
          name="Birthdate"
          ref={refBirthdate}
          defaultValue={student.Birthdate.split("T")[0]}
        />
      </label>
      <label htmlFor="Grade">
        Grado:
        <select name="Grade" ref={refGrade} defaultValue={student.Grade}>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="Section">
        Sección:
        <select name="Section" ref={refSection} defaultValue={student.Section}>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">
        {student.Id === 0 ? "Registrar" : "Actualizar"}
      </button>
    </form>
  );
};

interface StudentFormProps {
  student: Student;
  resetStudent: Function;
  closeModal: Function;
}

export default StudentsForm;
