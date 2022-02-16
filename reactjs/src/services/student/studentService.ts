import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { CreateOrUpdateStudentInput } from './dto/createOrUpdateStudentInput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllStudentOutput } from './dto/getAllStudentOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { PagedStudentResultRequestDto } from "./dto/PagedStudentResultRequestDto";
import { UpdateStudentInput } from './dto/updateStudentInput';

import http from '../httpService';

class StudentService {
  public async create(createStudentInput: CreateOrUpdateStudentInput) {
    let result = await http.post('api/services/app/Student/CreateStudent', createStudentInput);
    return result.data.result;
  }

  public async update(updateStudentInput: UpdateStudentInput) {
    let result = await http.put('api/services/app/Student/UpdateStudent', updateStudentInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Student/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/Student/GetRoles');
    return result.data.result.items;
  }

  public async getCourses() {
    let result = await http.get('api/services/app/Course/GetAll');
    return result.data.result.items;
  }


  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/Student/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateStudentInput> {
    let result = await http.get('api/services/app/Student/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedStudentResultRequestDto): Promise<PagedResultDto<GetAllStudentOutput>> {
    let result = await http.get('api/services/app/Student/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new StudentService();
