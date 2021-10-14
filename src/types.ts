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

export interface IdResponse {
  Id: number;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type Error = string | null;
