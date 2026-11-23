import { useQuery } from "@tanstack/react-query";

import {
  getAssignedSections,
  getTeacherInfoByUserId,
  getTeacherSchedules,
} from "../../requests/teacherRequests.js";
import {
  getParentAnnouncements,
  getParentDashboardStudents,
  getParentInfoByUserId,
} from "../../requests/parentRequests.js";
import { queryKeys } from "../../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../../lib/queryClient.js";

const referenceOptions = {
  staleTime: QUERY_STALE_TIME.referenceData,
};

export const useAssignedSections = () =>
  useQuery({
    queryKey: queryKeys.teachers.assignedSections,
    queryFn: getAssignedSections,
    ...referenceOptions,
  });

export const useTeacherInfo = () =>
  useQuery({
    queryKey: queryKeys.teachers.me,
    queryFn: getTeacherInfoByUserId,
    ...referenceOptions,
  });

export const useTeacherSchedules = () =>
  useQuery({
    queryKey: queryKeys.teachers.schedules,
    queryFn: getTeacherSchedules,
    ...referenceOptions,
  });

export const useParentInfo = () =>
  useQuery({
    queryKey: queryKeys.parents.me,
    queryFn: getParentInfoByUserId,
    ...referenceOptions,
  });

export const useParentStudents = () =>
  useQuery({
    queryKey: queryKeys.parents.students,
    queryFn: getParentDashboardStudents,
    ...referenceOptions,
  });

export const useParentAnnouncements = () =>
  useQuery({
    queryKey: queryKeys.parents.announcements,
    queryFn: getParentAnnouncements,
    ...referenceOptions,
  });
