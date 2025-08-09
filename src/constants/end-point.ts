
const rootRoutes = '/api/v1';

const rootAuthRoute = `user`;
const rootClassScheduleRoute = `${rootRoutes}/class-schedule`;
const rootDoctorRoute = `${rootRoutes}/users/doctor`;
const rootPatientRoute = `${rootRoutes}/users`;

const rootWebSiteInfoRoutes = `${rootRoutes}/website-info`;
const rootCanonicalRoutes = 'get-canonicalUrl';
const rootMailRoutes = `${rootRoutes}/mail/`;
export const websiteInfoRoutes = {
    get: rootWebSiteInfoRoutes
};

export const MAIL_ENDPOINTS = {
    SEND_CONTACT: `${rootMailRoutes}/send-contact`,
    VERIFY_EMAIL: `${rootMailRoutes}/verify-email`,
    SUBSCRIBE: `${rootMailRoutes}/subscribe`
};

export const rootCanonicalUrlRoutes = {
    get: `${rootCanonicalRoutes}`
};

//auth
export const authRoutes = {
    diagnosticForm: `${rootRoutes}/diagnostic`,
    login: `${rootAuthRoute}/login`,
    register: `${rootAuthRoute}/signup`,
    get_all_user: `${rootAuthRoute}/get-all-user`,
    delete_user: (id: string) => `${rootAuthRoute}/delete-user/${id}`,
    update_user: (id: string) => `${rootAuthRoute}/update-user/${id}`,
    getById: (id: string) => `${rootAuthRoute}/single-user/${id}`,  
    forgotPassword: `${rootAuthRoute}/passwordreset`,
};

//class schedule
export const classScheduleRoutes = {
    getAll: rootClassScheduleRoute,
    create: rootClassScheduleRoute,
    delete: (id: string) => `${rootClassScheduleRoute}/${id}`,
    getById: (id: string) => `${rootClassScheduleRoute}/${id}`,
    update: (id: string) => `${rootClassScheduleRoute}/${id}`
};

//doctor
export const doctorRoutes = {
    create: rootDoctorRoute,
    get: rootDoctorRoute,
    updateById: (id: string) => `${rootDoctorRoute}/${id}`,
    deleteById: (id: string) => `${rootDoctorRoute}/${id}`
};
//patient
export const patientRoutes = {
    create: rootPatientRoute,
    get: rootPatientRoute,
    updateById: (id: string) => `${rootPatientRoute}/${id}`,
    deleteById: (id: string) => `${rootPatientRoute}/${id}`
};
