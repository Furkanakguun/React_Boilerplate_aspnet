import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedStudentResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
