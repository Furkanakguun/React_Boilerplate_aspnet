import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { CreateOrUpdateCourseInput } from './dto/createOrUpdateCourseInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllCourseOutput } from './dto/getAllCourseOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedCourseResultRequestDto } from "./dto/PagedCourseResultRequestDto";
import { UpdateCourseInput } from './dto/updateCourseInput';

import http from '../httpService';

class CourseService {
  public async create(createCourseInput: CreateOrUpdateCourseInput) {
    let result = await http.post('api/services/app/Course/Create', createCourseInput);
    return result.data.result;
  }

  public async update(updateCourseInput: UpdateCourseInput) {
    let result = await http.put('api/services/app/Course/Update', updateCourseInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Course/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/Course/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/Course/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCourseInput> {
    let result = await http.get('api/services/app/Course/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCourseResultRequestDto): Promise<PagedResultDto<GetAllCourseOutput>> {
    let result = await http.get('api/services/app/Course/GetList', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new CourseService();
