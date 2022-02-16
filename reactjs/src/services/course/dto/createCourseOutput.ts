export interface CreateCourseOutputItem {
  name : string;
  capacity: string;
  departmentId: number;
  id: number;
}

export interface CreateCourseOutput {
  result: CreateCourseOutputItem;
}
