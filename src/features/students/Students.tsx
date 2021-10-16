import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Modal from "../../common/Modal";
import { Student, zeroStudent } from "../../types";
import StudentsCard from "./StudentsCard";
import StudentsForm from "./StudentsForm";
import { fetchStudents, deleteStudent } from "./studentsSlice";

let a = 0;

const Students = () => {
  a += 1;
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

  const resetStudent = (fn: (student: Student) => void) => {
    setEditingStudent(zeroStudent);
  };

  return (
    <div>
      <span>Renders: {a}</span>
      {modal && (
        <Modal
          onClose={() => {
            setModal(false);
          }}
        >
          <StudentsForm
            student={editingStudent}
            resetStudent={resetStudent}
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

      {students.map((student) => (
        <StudentsCard
          student={student}
          key={student.Id}
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
