import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Enhanced Axios Instance with Interceptors
const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    config => {
        console.log('Axios Request:', {
            method: config.method,
            url: config.url,
            baseURL: config.baseURL,
            data: config.data
        });
        return config;
    },
    error => {
        console.error('Axios Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    response => {
        console.log('Axios Response:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('Axios Response Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        return Promise.reject(error);
    }
);

export async function Login(formData) {
    try {
        console.log('Login Attempt:', {
            url: `/auth/login/`,
            data: formData
        });
        const response = await axiosInstance.post(`/auth/login/`, formData);
        return response.data;
    } catch (error) {
        console.error('Login Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export async function Register(formData) {
    try {
        console.log('Register Attempt:', {
            url: `/auth/register/`,
            data: formData
        });
        const response = await axiosInstance.post(`/auth/register/`, formData);
        return response.data;
    } catch (error) {
        console.error('Register Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export async function RefreshToken(refreshToken) {
    try {
        console.log('Refresh Token Attempt:', {
            url: `/auth/refresh/`,
            data: refreshToken
        });
        const response = await axiosInstance.post(`/auth/refresh/`, {refresh: refreshToken.trim()});
        return response.data;
    } catch (error) {
        console.error('Refresh Token Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export async function GetCvList(accessToken, page = 1, limit = 10, offset = 0) {
    try {
        console.log('Get CV List Attempt:', {
            url: `/api/cv/?limit=${limit}&offset=${offset}&page=${page}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await axiosInstance.get(`/api/cv/?limit=${limit}&offset=${offset}&page=${page}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Get CV List Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export async function CreateUpdateCv(accessToken, cvData) {

    try {
        console.log('Create/Update CV Attempt:', {
            url: `/api/cv/`,
            data: cvData,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        let url = `/api/cv/`;
        const isUpdate = cvData.id === "new";
        const method = isUpdate ? "POST" : "PUT";
        if(!isUpdate) url += cvData.id + '/';
        else delete cvData.id;
        const sendData = {
            ...cvData,
            data: JSON.stringify(cvData.data)
        }
        const response = await axiosInstance({
            method,
            url,
            headers,
            data: sendData
        });
        return response.data;
    } catch (error) {
        console.error('Create/Update CV Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}

export async function GetCv(accessToken, cvId) {
    try {
        console.log('Get CV Attempt:', {
            url: `/api/cv/${cvId}/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await axiosInstance.get(`/api/cv/${cvId}/`, { headers });
        return response.data;
    } catch (error) {
        console.error('Get CV Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}