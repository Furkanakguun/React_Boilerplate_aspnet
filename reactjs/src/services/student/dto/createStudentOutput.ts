export interface CreateStudentOutputItem {
  name : string;
  surname: string;
  department: string;
  id: number;
}

export interface CreateStudentOutput {
  result: CreateStudentOutputItem;
}
