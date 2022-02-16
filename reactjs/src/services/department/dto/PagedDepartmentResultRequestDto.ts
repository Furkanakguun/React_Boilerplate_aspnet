import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedDepartmentResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
