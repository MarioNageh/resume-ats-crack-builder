const updateResumeData = (newData, setResumeData, syncResumeData) => {
    setResumeData(newData);
    syncResumeData(newData);
};

const onDragEnd = (result, resumeData, setResumeData, syncResumeData) => {
    const {destination, source} = result;

    if (!destination) return;

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    )
        return;

    const updateData = (newData) => updateResumeData(newData, setResumeData, syncResumeData);

    // Handle Main Layout
    if (source.droppableId === "layout") {
        const newOrder = [...resumeData.data.order];
        const [removed] = newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                order: newOrder,
            },
        });
        return;
    }

    // Handle Profile
    if (source.droppableId === "profile") {
        const newProfile = [...resumeData.data.summary];
        const [removed] = newProfile.splice(source.index, 1);
        newProfile.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                summary: newProfile,
            },
        });
        return;
    }

    // Handle Experience
    if (source.droppableId === "work-experience" || source.droppableId === "experience") {
        const newWorkExperience = [...resumeData.data.workExperience];
        const [removed] = newWorkExperience.splice(source.index, 1);
        newWorkExperience.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
        return;
    }

    if (source.droppableId.includes("experience-technology")) {
        const indexOfExperience = parseInt(source.droppableId.split("-")[2]);
        const newWorkExperience = [...resumeData.data.workExperience];
        const technologies = newWorkExperience[indexOfExperience].technologies;
        const [removed] = technologies.splice(source.index, 1);
        technologies.splice(destination.index, 0, removed);
        newWorkExperience[indexOfExperience].technologies = technologies;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
        return;
    }

    if (source.droppableId.includes("experience-achievement")) {
        const indexOfExperience = parseInt(source.droppableId.split("-")[2]);
        const newWorkExperience = [...resumeData.data.workExperience];
        const achievements = newWorkExperience[indexOfExperience].achievements;
        const [removed] = achievements.splice(source.index, 1);
        achievements.splice(destination.index, 0, removed);
        newWorkExperience[indexOfExperience].achievements = achievements;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                workExperience: newWorkExperience,
            },
        });
        return;
    }

    if (source.droppableId === "education" || source.droppableId === "education-preview") {
        const newEducations = [...resumeData.data.educations];
        const [removed] = newEducations.splice(source.index, 1);
        newEducations.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                educations: newEducations,
            },
        });
        return;
    }

    if (source.droppableId.includes("certification-notes")) {
        const indexOfExperience = parseInt(source.droppableId.split("-")[2]);
        const newCourses = [...resumeData.data.courses];
        const notes = newCourses[indexOfExperience].notes;
        const [removed] = notes.splice(source.index, 1);
        notes.splice(destination.index, 0, removed);
        newCourses[indexOfExperience].notes = notes;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                courses: newCourses,
            },
        });
        return;
    }

    if (source.droppableId === "courses" || source.droppableId === "certification-preview") {
        const newCourses = [...resumeData.data.courses];
        const [removed] = newCourses.splice(source.index, 1);
        newCourses.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                courses: newCourses,
            },
        });
        return;
    }

    if (source.droppableId.includes("skills-list")) {
        const indexOfExperience = parseInt(source.droppableId.split("-")[2]);
        const newSkills = [...resumeData.data.skills];
        const skills = newSkills[indexOfExperience].skills;
        const [removed] = skills.splice(source.index, 1);
        skills.splice(destination.index, 0, removed);
        newSkills[indexOfExperience].skills = skills;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: newSkills,
            },
        });
        return;
    }

    if (source.droppableId === "skills" || source.droppableId === "skills-preview") {
        const newSkills = [...resumeData.data.skills];
        const [removed] = newSkills.splice(source.index, 1);
        newSkills.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                skills: newSkills,
            },
        });
        return;
    }

    if (source.droppableId === "languages" || source.droppableId === "languages-preview") {
        const newLanguages = [...resumeData.data.languages];
        const [removed] = newLanguages.splice(source.index, 1);
        newLanguages.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                languages: newLanguages,
            },
        });
    }


    if (source.droppableId === "projects" || source.droppableId === "projects-preview") {
        const newProjects = [...resumeData.data.projects];
        const [removed] = newProjects.splice(source.index, 1);
        newProjects.splice(destination.index, 0, removed);
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: newProjects,
            },
        });
        return;
    }

    if (source.droppableId.includes("project-achievements")) {
        const projectIndex = parseInt(source.droppableId.split("-")[2]);
        const newProjects = [...resumeData.data.projects];
        const achievements = newProjects[projectIndex].achievements;
        const [removed] = achievements.splice(source.index, 1);
        achievements.splice(destination.index, 0, removed);
        newProjects[projectIndex].achievements = achievements;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: newProjects,
            },
        });
        return;
    }

    if (source.droppableId.includes("project-technologies")) {
        const projectIndex = parseInt(source.droppableId.split("-")[2]);
        const newProjects = [...resumeData.data.projects];
        const technologies = newProjects[projectIndex].technologies;
        const [removed] = technologies.splice(source.index, 1);
        technologies.splice(destination.index, 0, removed);
        newProjects[projectIndex].technologies = technologies;
        updateData({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: newProjects,
            },
        });
        return;
    }

};

export {onDragEnd};
