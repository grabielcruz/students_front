import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Student } from "../../types";
import StudentsCard from "./StudentsCard";
import StudentsForm from "./StudentsForm";
import { fetchStudents } from "./studentsSlice";

const Students = () => {
  const zeroStudent: Student = {
    Id: 0,
    Name: "",
    Surname: "",
    Code: "",
    Grade: "sin grado",
    Section: "sin sección",
    Birthdate: "2000-01-01",
    PublicId: "",
    Photo: "",
  };

  const students = useSelector((state: RootState) => state.students.students);
  const status = useSelector((state: RootState) => state.students.status);
  const error = useSelector((state: RootState) => state.students.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchStudents());
  }, [dispatch, status]);

  return (
    <div>
      {error && error}
      {status === "loading" && "loading..."}
      <StudentsForm student={zeroStudent} zeroStudent={zeroStudent} />
      <StudentsCard students={students} />
    </div>
  );
};

export default Students;
