// SummaryApi.js
export const baseURL = "http://localhost:8080"; // or whatever your backend port is

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post",
    },
    login: {
        url: "/api/user/login",
        method: "post",
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "put",
    },
    forgot_password_otp_verification: {
        url: "/api/user/verify-forgot-password-otp",
        method: "put",
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "put",
    },
    refershToken: {
        url: "/api/user/refresh-token",
        method: "post",
    },

    addCategory: {
        url: '/api/category/add-category',
        method: "post",
    },
    userDetails: {
        url: '/api/user/user-details',
        method: "get",
    },
    logout:{
        url : '/api/user/logout',
        method: 'get'
    },
    
    refershToken:{
        url: '/api/user/refresh-token',
        method: 'post'
    },
    uploadAvatar: {
        url: 'api/user/upload-avatar',
        method: 'put',
    },
    updateUserDetails: {
        url: 'api/user/update-user',
        method: 'put',
    },
    

};

export default SummaryApi;
