export interface Student {
  Id: number;
  Name: string;
  Surname: string;
  Code: string;
  Grade: string;
  Section: string;
  Birthdate: string;
  PublicId: string;
  Photo: string;
}

export const zeroStudent: Student = {
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

export interface IdResponse {
  Id: number;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type Error = string | null;
