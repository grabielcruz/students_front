import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import StudentsCard from "./StudentsCard";
import { fetchStudents } from "./studentsSlice";

const Students = () => {
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
      <StudentsCard students={students} />
    </div>
  );
};

export default Students;
