import { action, observable } from 'mobx';
import { CreateOrUpdateStudentInput } from '../services/student/dto/createOrUpdateStudentInput';
import { EntityDto } from '../services/dto/entityDto';
// import { GetRoles } from '../services/student/dto/getRolesOuput';
import { GetStudentOutput } from '../services/student/dto/getStudentOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedStudentResultRequestDto } from '../services/student/dto/PagedStudentResultRequestDto';
import { UpdateStudentInput } from '../services/student/dto/updateStudentInput';
import studentService from '../services/student/studentService';
import { GetCourses } from '../services/student/dto/getCoursesOutput';

class StudentStore {
   @observable students!: PagedResultDto<GetStudentOutput>;
   @observable editStudent!: CreateOrUpdateStudentInput;
   @observable courses: GetCourses[] = [];


  @action
  async create(createStudentInput: CreateOrUpdateStudentInput) {
    let result = await studentService.create(createStudentInput);
    this.students.items.push(result);
  }

  @action
  async update(updateStudentInput: UpdateStudentInput) {
    let result = await studentService.update(updateStudentInput);
    this.students.items = this.students.items.map((x: GetStudentOutput) => {
      if (x.id === updateStudentInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await studentService.delete(entityDto);
    this.students.items = this.students.items.filter((x: GetStudentOutput) => x.id !== entityDto.id);
  }

  // @action
  // async getRoles() {
  //   let result = await userService.getRoles();
  //   this.roles = result;
  // }

    @action
  async getCourses() {
    let result = await studentService.getCourses();
    this.courses = result;
  }


  @action
  async get(entityDto: EntityDto) {
    let result = await studentService.get(entityDto);
    this.editStudent = result;
  }

  @action
  async createUser() {
    this.editStudent = {
      name: '',
      surname: '',
      department: '',
      id: 0,
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedStudentResultRequestDto) {
    let result = await studentService.getAll(pagedFilterAndSortedRequest);
    this.students = result;
  }

  async changeLanguage(languageName: string) {
    await studentService.changeLanguage({ languageName: languageName });
  }
}

export default StudentStore;
