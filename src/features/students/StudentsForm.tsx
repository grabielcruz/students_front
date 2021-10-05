import { useDispatch } from "react-redux";
import { grades, sections } from "../../constants";
import { Student } from "../../types";
import { createStudent, updateStudent } from "./studentsSlice";

const StudentsForm: React.FC<StudentFormProps> = ({
  student,
  setStudent,
  zeroStudent,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStudent((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStudent = { ...student };
    const date = new Date(newStudent.Birthdate);
    newStudent.Birthdate = date.toISOString();
    console.log(newStudent);

    if (newStudent.Id === 0) {
      dispatch(createStudent(newStudent));
    } else {
      dispatch(updateStudent(newStudent));
    }
    setStudent(zeroStudent);
    closeModal();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="Name">
        Nomber:
        <input
          type="text"
          name="Name"
          onChange={(e) => handleChange(e)}
          value={student.Name}
        />
      </label>
      <label htmlFor="Surname">
        Apellidos:
        <input
          type="text"
          name="Surname"
          onChange={(e) => handleChange(e)}
          value={student.Surname}
        />
      </label>
      <label htmlFor="PublicId">
        Cédula:
        <input
          type="text"
          name="PublicId"
          onChange={(e) => handleChange(e)}
          value={student.PublicId}
        />
      </label>
      <label htmlFor="Code">
        Código:
        <input
          type="text"
          name="Code"
          onChange={(e) => handleChange(e)}
          value={student.Code}
        />
      </label>
      <label htmlFor="Birthdate">
        Fecha de Nacimiento:
        <input
          type="date"
          name="Birthdate"
          value={student.Birthdate.split("T")[0]}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Grade">
        Grado:
        <select
          name="Grade"
          onChange={(e) => handleChange(e)}
          value={student.Grade}
        >
          {grades.map((grade, i) => (
            <option key={i} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="Section">
        Sección:
        <select
          name="Section"
          onChange={(e) => handleChange(e)}
          value={student.Section}
        >
          {sections.map((section, i) => (
            <option key={i} value={section}>
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
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
  zeroStudent: Student;
  closeModal: Function;
}

export default StudentsForm;
