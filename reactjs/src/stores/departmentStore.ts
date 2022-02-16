import { action, observable } from 'mobx';
import { CreateOrUpdateDepartmentInput } from '../services/department/dto/createOrUpdateDepartmentInput';
import { EntityDto } from '../services/dto/entityDto';
// import { GetRoles } from '../services/department/dto/getRolesOuput';
import { GetDepartmentOutput } from '../services/department/dto/getDepartmentOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedDepartmentResultRequestDto } from '../services/department/dto/PagedDepartmentResultRequestDto';
import { UpdateDepartmentInput } from '../services/department/dto/updateDepartmentInput';
import departmentService from '../services/department/departmentService';

class DepartmentStore {
   @observable departments!: PagedResultDto<GetDepartmentOutput>;
   @observable editDepartment!: CreateOrUpdateDepartmentInput;


  @action
  async create(createDepartmentInput: CreateOrUpdateDepartmentInput) {
    let result = await departmentService.create(createDepartmentInput);
    this.departments.items.push(result);
  }

  @action
  async update(updateDepartmentInput: UpdateDepartmentInput) {
    let result = await departmentService.update(updateDepartmentInput);
    this.departments.items = this.departments.items.map((x: GetDepartmentOutput) => {
      if (x.id === updateDepartmentInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await departmentService.delete(entityDto);
    this.departments.items = this.departments.items.filter((x: GetDepartmentOutput) => x.id !== entityDto.id);
  }

  // @action
  // async getRoles() {
  //   let result = await userService.getRoles();
  //   this.roles = result;
  // }

  @action
  async get(entityDto: EntityDto) {
    let result = await departmentService.get(entityDto);
    this.editDepartment = result;
  }

  // @action
  // async createUser() {
  //   this.editDepartment = {
  //     name: '',
  //     id: 0,
  //   };
  // }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedDepartmentResultRequestDto) {
    let result = await departmentService.getAll(pagedFilterAndSortedRequest);
    this.departments = result;
  }

  async changeLanguage(languageName: string) {
    await departmentService.changeLanguage({ languageName: languageName });
  }
}

export default DepartmentStore;
