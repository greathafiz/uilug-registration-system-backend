interface CourseDetails {
  id: number;
  course_code: string;
  course_title: string;
  credit_unit: number;
  course_synopsis: null;
  department_id: number;
  institution_id: number;
  semester_setting_id: number;
  student_academic_level_id: number;
  type: string;
  institute_id: null;
  created_at: string;
  updated_at: string;
  status: number;
  deleted_at: null;
  host_type: string;
  host_id: number;
  lms_id: number;
}

interface CandidateDetails {
  id: number;
  student_number: string;
  temporary_matric_number: null;
  exempted_from_matric: number;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phone: string;
  gender: number;
  marital_status: number;
  title: string;
  date_of_birth: string;
  local_government_area: string;
  nationality: string;
  ountry: string;
  state_of_origin: string;
  address: string;
  picture_url: string;
  status: string;
  institution_id: number;
  institute_id: null;
  department_id: number;
  programme_id: number;
  current_level_id: number;
  entry_level_id: number;
  mode_of_entry_id: number;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  admission_session_id: number;
  year_of_entry: number;
  matriculated: number;
  jamb_registration_number: string;
  student_category: number;
  signature_url: string;
  deleted_at: null;
  host_type: null;
  host_id: null;
  lms_id: number;
  specialization_id: null;
  created_by: null;
  updated_by: null;
}

interface SessionDetails {
  id: number;
  session_name: string;
  start_date: string;
  end_date: null;
  registration_payment_status: number;
  institution_id: number;
  institute_id: null;
  created_at: string;
  updated_at: string;
  status: number;
  lms_id: number;
}

interface SemesterDetails {
  id: 12;
  semester_setting_id: number;
  session_id: number;
  institution_id: number;
  institute_id: null;
  start_date: string;
  end_date: null;
  created_at: string;
  updated_at: string;
  status: 2;
  lms_id: 2;
  semester_setting: SemesterSettingInterface;
}

interface SemesterSettingInterface {
  id: number;
  institution_id: number;
  institute_id: null;
  position: number;
  acronym: string;
  title: string;
  created_at: string;
  updated_at: string;
  lms_id: number;
}

interface InstitutionDetails {
  id: 14;
  category: 1;
  ownership: 1;
  name: string;
  accronym: string;
  subdomain: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: 1;
  logo_url: string;
  banner_url: string;
  created_at: string;
  updated_at: string;
  inspired_id: null;
  terms_conditions: 1;
  motto: string;
  portal_domain: string;
  database: string;
  url: string;
  lms_api_key: string;
  lms_id: number;
  settings: null;
}

export interface Course {
  course_code: string;
  id: number;
  course: CourseDetails;
  units: number;
  candidate: CandidateDetails;
  session: SessionDetails;
  semester: SemesterDetails;
  semester_accronym: string;
  semester_position: number;
  semester_title: string;
  score: null;
  course_status: string;
  approval_status: string;
  approval_remark: string;
  remark: string;
  institution: InstitutionDetails;
  created_at: string;
  updated_at: string;
}
