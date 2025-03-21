import React from "react";
import useAppContext from "@/hooks/useAppContext";
import { FaCode } from "react-icons/fa";
import MinimizedCard from "@/components/general/minimized-card";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import { ControlPanelView, ControlPanelMode } from "@/components/cv-builder/control-components/utils/enums";
import ProjectItem from "@/components/cv-builder/control-components/items/project-item";

const ProjectsEditor = ({}) => {
    const {setResumeData, resumeData, setControlPanelIndex, setCurrentEditIndex, syncResumeData} = useAppContext();
    const title = "Projects";
    const draggableId = "projects";
    const type = "PROJECTS";



    const OnDisableItem = (index) => {
        const projects = [...resumeData.data.projects];
        projects[index].isShownInPreview = !projects[index].isShownInPreview;

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: projects,
            },
        });
    };

    const OnRemoveItem = (index) => {
        const projects = [...resumeData.data.projects];
        projects.splice(index, 1);

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: projects,
            },
        });
    };

    const OnEditItem = (e, index) => {
        setCurrentEditIndex({ index: index, mode: ControlPanelMode.Edit });
        setControlPanelIndex(ControlPanelView.ProjectsEditor);
    };

    const OnClickAddButton = () => {
        const newProject = {
            title: "",
            description: "",
            technologies: [],
            link: "",
            startYear: "",
            endYear: "",
            achievements: [],
            isShownInPreview: true,
        };

        finalState({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: [...resumeData.data.projects, newProject],
            },
        });

        setCurrentEditIndex({ index: resumeData.data.projects.length, mode: ControlPanelMode.Add });
        setControlPanelIndex(ControlPanelView.ProjectsEditor);
    };

    const finalState = (state) => {
        setResumeData(state);
        syncResumeData(state);
    }


    if(!resumeData.data.projects)
    {
        // Backward compatibility
        resumeData.data.projects = [];
        resumeData.data.titles.projects = "PROJECTS";
        const workExpIndex = resumeData.data.order.indexOf("workExperience");
        resumeData.data.order.splice(workExpIndex + 1, 0, "projects");
        setResumeData(resumeData);


    }

    return <MinimizedCard
        titleSection={"projects"}
        btnAddTitle={title}
        item={resumeData}
        Icon={FaCode}
        haveAddButton={true}
        viewIndex={ControlPanelView.ProjectsEditor}
        OnClickAddButton={OnClickAddButton}
    >
        <DroppableUtil type={type} droppableId={draggableId}>
            {resumeData.data.projects.map((projectItem, index) => {
                return <ProjectItem
                    draggableId={`${type}-${index}`}
                    keyData={`${type}-${index}`}
                    key={`${type}-${index}`}
                    index={index}
                    projectItem={projectItem}
                    OnDisableItem={OnDisableItem}
                    OnRemoveItem={OnRemoveItem}
                    OnEditItem={OnEditItem}
                    type={type}/>
            })}
        </DroppableUtil>
    </MinimizedCard>
}

export default ProjectsEditor;