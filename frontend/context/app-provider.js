"use client";
import React, {useEffect, useRef, useState} from 'react';
import AppContext from './app-context';
import {getEmailAndName} from "@/lib/utils";
import {cvCreateUpdate, cvGetAction} from "@/actions/cvs";

const AppProvider = ({children}) => {
    const [resumeData, setResumeData] = useState(null);
    const [resumeList, setResumeList] = useState([]);
    const globalRefs = useRef({});
    const [controlPanel, setControlPanel] = useState(0);
    const [lastControlPanel, setLastControlPanel] = useState(0);
    const [currentEditIndex, setCurrentEditIndex] = useState({});


    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const setControlPanelIndex = (index) => {
        setLastControlPanel(controlPanel);
        setControlPanel(index);

    };


    const syncResumeData = async (data) => {
        const response = await cvCreateUpdate(data);
        if(response.success && resumeData.id === 'new'){
            setResumeData({
                ...response.response
            });

        }
    }

    const defaultCv = {
        id: 'new',
        name: 'New CV',

        data: {
            name: '',
            position: '',
            contactInformation: '',
            email: '',
            address: '',
            socialMedia: [],
            summary: [],
            educations: [],
            courses: [],
            workExperience: [],
            projects: [],
            skills: [],
            languages: [],
            titles: {
                "profile": "PROFILE",
                "experience": "EXPERIENCE",
                "education": "EDUCATION",
                "certification": "CERTIFICATION",
                "skills": "SKILLS",
                "languages": "LANGUAGES",
                "projects": "PROJECTS"
            },

            order: [
                "contactInformation",
                "profile",
                "workExperience",
                "projects",
                "education",
                "courses",
                "skills",
                "languages"
            ],

        }
    }

    const getResumeWithId = async (id) => {
        if (id === 'cvnew') {
            setResumeData({...defaultCv});
            return;
        }

        let cv = resumeList.find(cv => cv.id === id);
        if (!cv) {
            const response = await cvGetAction(id);
            if (response.success) {
                cv = response.cv;
            }
        }

        if (cv) {
            // Backward compatibility
            if (!cv.data.projects) {
                cv.data.projects = [];
                cv.data.titles.projects = "PROJECTS";
                const workExpIndex = cv.data.order.indexOf("workExperience");
                cv.data.order.splice(workExpIndex + 1, 0, "projects");
            }
        }
        setResumeData(cv);
    }


    const updateResumeData = (newData) => {
        setResumeData(newData);
    }

    const OnEditSectionTitle = (e, section) => {
        const value = e.target.innerText;
        const updatedTitles = {...resumeData.titles, [section]: value};
        setResumeData({...resumeData, titles: updatedTitles});
    }


    const checkAuthStatus = () => {
        const data = getEmailAndName();
        if (data.isAuthenticated) {
            if(!user)
                login(data);
        } else {
            logout();
        }
    };

    useEffect(() => {
        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 1000 * 30);
        return () => clearInterval(interval);
    }, []);


    return (
        <AppContext.Provider value={{
            resumeData,
            setResumeData,
            globalRefs,
            updateResumeData,
            OnEditSectionTitle,
            controlPanel,
            lastControlPanel,
            setControlPanelIndex,
            currentEditIndex,
            setCurrentEditIndex,


            user, isAuthenticated, login, logout,
            resumeList, setResumeList, syncResumeData,getResumeWithId,defaultCv
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;