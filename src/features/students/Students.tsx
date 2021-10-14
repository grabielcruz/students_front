import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Modal from "../../common/Modal";
import { Student } from "../../types";
import StudentsCard from "./StudentsCard";
import StudentsForm from "./StudentsForm";
import { fetchStudents, deleteStudent } from "./studentsSlice";

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

  const [editingStudent, setEditingStudent] = useState<Student>(zeroStudent);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const students = useSelector((state: RootState) => state.students.students);
  const status = useSelector((state: RootState) => state.students.status);
  const error = useSelector((state: RootState) => state.students.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchStudents());
  }, [dispatch, status]);

  useEffect(() => {
    console.log(editingStudent);
  }, [editingStudent]);

  return (
    <div>
      {modal && (
        <Modal
          onClose={() => {
            setModal(false);
          }}
        >
          <StudentsForm
            student={editingStudent}
            setStudent={setEditingStudent}
            zeroStudent={zeroStudent}
            closeModal={() => setModal(false)}
          />
        </Modal>
      )}

      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)}>
          <div>
            <p>Desea borrar el estudiante?</p>{" "}
            <button
              type="button"
              onClick={() => {
                dispatch(deleteStudent(editingStudent.Id));
                setDeleteModal(false);
                setEditingStudent(zeroStudent);
              }}
            >
              Sí
            </button>
            <button type="button" onClick={() => setDeleteModal(false)}>
              No
            </button>
          </div>
        </Modal>
      )}

      <button
        type="button"
        onClick={() => {
          setModal(true);
          setEditingStudent(zeroStudent);
        }}
      >
        Crear estudiante
      </button>

      {error && error}
      {status === "loading" && "loading..."}

      {students.map((student, i) => (
        <StudentsCard
          student={student}
          key={i}
          editStudent={() => {
            setEditingStudent(student);
            setModal(true);
          }}
          deleteStudent={() => {
            setEditingStudent(student);
            setDeleteModal(true);
          }}
        />
      ))}
    </div>
  );
};

export default Students;
