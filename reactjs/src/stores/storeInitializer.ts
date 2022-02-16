import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import StudentStore from './studentStore';
import CourseStore from './courseStore';
import DepartmentStore from './departmentStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    studentStore: new StudentStore(),
    courseStore: new CourseStore(),
    departmentStore : new DepartmentStore()
  };
}
