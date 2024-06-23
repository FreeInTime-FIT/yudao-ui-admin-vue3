// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建学生 POST /admin-api/infra/demo03-student/create */
export async function createDemo03Student(
  params: APITypes.createDemo03StudentParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03StudentSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/demo03-student/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生 DELETE /admin-api/infra/demo03-student/delete */
export async function deleteDemo03Student(
  params: APITypes.deleteDemo03StudentParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建学生课程 POST /admin-api/infra/demo03-student/demo03-course/create */
export async function createDemo03Course(
  params: APITypes.createDemo03CourseParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03CourseDO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/demo03-student/demo03-course/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生课程 DELETE /admin-api/infra/demo03-student/demo03-course/delete */
export async function deleteDemo03Course(
  params: APITypes.deleteDemo03CourseParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/demo03-course/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生课程 GET /admin-api/infra/demo03-student/demo03-course/get */
export async function getDemo03Course(
  params: APITypes.getDemo03CourseParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo03CourseDO>({
    url: `/admin-api/infra/demo03-student/demo03-course/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生课程列表 GET /admin-api/infra/demo03-student/demo03-course/list-by-student-id */
export async function getDemo03CourseListByStudentId(
  params: APITypes.getDemo03CourseListByStudentIdParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDemo03CourseDO>({
    url: `/admin-api/infra/demo03-student/demo03-course/list-by-student-id`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生课程分页 GET /admin-api/infra/demo03-student/demo03-course/page */
export async function getDemo03CoursePage(
  params: APITypes.getDemo03CoursePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDemo03CourseDO>({
    url: `/admin-api/infra/demo03-student/demo03-course/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新学生课程 PUT /admin-api/infra/demo03-student/demo03-course/update */
export async function updateDemo03Course(
  params: APITypes.updateDemo03CourseParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03CourseDO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/demo03-course/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 创建学生班级 POST /admin-api/infra/demo03-student/demo03-grade/create */
export async function createDemo03Grade(
  params: APITypes.createDemo03GradeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03GradeDO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/demo03-student/demo03-grade/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生班级 DELETE /admin-api/infra/demo03-student/demo03-grade/delete */
export async function deleteDemo03Grade(
  params: APITypes.deleteDemo03GradeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/demo03-grade/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生班级 GET /admin-api/infra/demo03-student/demo03-grade/get */
export async function getDemo03Grade(
  params: APITypes.getDemo03GradeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo03GradeDO>({
    url: `/admin-api/infra/demo03-student/demo03-grade/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生班级 GET /admin-api/infra/demo03-student/demo03-grade/get-by-student-id */
export async function getDemo03GradeByStudentId(
  params: APITypes.getDemo03GradeByStudentIdParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo03GradeDO>({
    url: `/admin-api/infra/demo03-student/demo03-grade/get-by-student-id`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生班级分页 GET /admin-api/infra/demo03-student/demo03-grade/page */
export async function getDemo03GradePage(
  params: APITypes.getDemo03GradePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDemo03GradeDO>({
    url: `/admin-api/infra/demo03-student/demo03-grade/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新学生班级 PUT /admin-api/infra/demo03-student/demo03-grade/update */
export async function updateDemo03Grade(
  params: APITypes.updateDemo03GradeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03GradeDO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/demo03-grade/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 导出学生 Excel GET /admin-api/infra/demo03-student/export-excel */
export async function exportDemo03StudentExcel(
  params: APITypes.exportDemo03StudentExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/demo03-student/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生 GET /admin-api/infra/demo03-student/get */
export async function getDemo03Student(
  params: APITypes.getDemo03StudentParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo03StudentRespVO>({
    url: `/admin-api/infra/demo03-student/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得学生分页 GET /admin-api/infra/demo03-student/page */
export async function getDemo03StudentPage(
  params: APITypes.getDemo03StudentPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDemo03StudentRespVO>({
    url: `/admin-api/infra/demo03-student/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新学生 PUT /admin-api/infra/demo03-student/update */
export async function updateDemo03Student(
  params: APITypes.updateDemo03StudentParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo03StudentSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo03-student/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
