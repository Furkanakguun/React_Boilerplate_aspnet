import { action, observable } from 'mobx';
import { CreateOrUpdateCourseInput } from '../services/course/dto/createOrUpdateCourseInput';
import { EntityDto } from '../services/dto/entityDto';
// import { GetRoles } from '../services/course/dto/getRolesOuput';
import { GetCourseOutput } from '../services/course/dto/getCourseOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedCourseResultRequestDto } from '../services/course/dto/PagedCourseResultRequestDto';
import { UpdateCourseInput } from '../services/course/dto/updateCourseInput';
import courseService from '../services/course/courseService';

class CourseStore {
   @observable courses!: PagedResultDto<GetCourseOutput>;
   @observable editCourse!: CreateOrUpdateCourseInput;


  @action
  async create(createCourseInput: CreateOrUpdateCourseInput) {
    let result = await courseService.create(createCourseInput);
    this.courses.items.push(result);
  }

  @action
  async update(updateCourseInput: UpdateCourseInput) {
    let result = await courseService.update(updateCourseInput);
    this.courses.items = this.courses.items.map((x: GetCourseOutput) => {
      if (x.id === updateCourseInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await courseService.delete(entityDto);
    this.courses.items = this.courses.items.filter((x: GetCourseOutput) => x.id !== entityDto.id);
  }

  // @action
  // async getRoles() {
  //   let result = await userService.getRoles();
  //   this.roles = result;
  // }

  @action
  async get(entityDto: EntityDto) {
    let result = await courseService.get(entityDto);
    this.editCourse = result;
  }

  @action
  async createUser() {
    this.editCourse = {
      name: '',
      capacity: '',
      departmentId: 0,
      id: 0,
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCourseResultRequestDto) {
    let result = await courseService.getAll(pagedFilterAndSortedRequest);
    console.log("result",result);
    this.courses = result;
    console.log(this.courses)
    this.courses.items.map(car => {
      console.log(car);
    })
  }

}

export default CourseStore;
