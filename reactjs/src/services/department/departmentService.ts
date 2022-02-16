import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { CreateOrUpdateDepartmentInput } from './dto/createOrUpdateDepartmentInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllDepartmentOutput } from './dto/getAllDepartmentOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedDepartmentResultRequestDto } from "./dto/PagedDepartmentResultRequestDto";
import { UpdateDepartmentInput } from './dto/updateDepartmentInput';

import http from '../httpService';

class DepartmentService {
  public async create(createDepartmentInput: CreateOrUpdateDepartmentInput) {
    let result = await http.post('api/services/app/Department/Create', createDepartmentInput);
    return result.data.result;
  }

  public async update(updateDepartmentInput: UpdateDepartmentInput) {
    let result = await http.put('api/services/app/Department/Update', updateDepartmentInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Department/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/Department/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/Department/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateDepartmentInput> {
    let result = await http.get('api/services/app/Department/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedDepartmentResultRequestDto): Promise<PagedResultDto<GetAllDepartmentOutput>> {
    let result = await http.get('api/services/app/Department/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new DepartmentService();
