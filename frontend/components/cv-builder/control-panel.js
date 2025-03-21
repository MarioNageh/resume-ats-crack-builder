"use client";
import useAppContext from "@/hooks/useAppContext";
import {ControlPanelView} from "@/components/cv-builder/control-components/utils/enums"
import ResumeTitleDownload from "@/components/cv-builder/control-components/resume-title";
import ContactInformationPreview from "@/components/cv-builder/control-components/contact-information-preview";
import ContactInformationEdit from "@/components/cv-builder/control-components/contact-information-edit";
import ProfileEditor from "@/components/cv-builder/control-components/profile-editor";
import WorkExperienceItemEditor from "@/components/cv-builder/control-components/work-experience-item-editor";
import WorkExperienceEditor from "@/components/cv-builder/control-components/work-experience-editor";
import EducationEditor from "@/components/cv-builder/control-components/education-editor";
import EducationItemEditor from "@/components/cv-builder/control-components/education-item-editor";
import {useEffect, useState} from "react";
import CertificationEditor from "@/components/cv-builder/control-components/certification-editor";
import CertificationItemEditor from "@/components/cv-builder/control-components/certification-item-editor";
import SkillsEditor from "@/components/cv-builder/control-components/skills-editor";
import SkillItemEditor from "@/components/cv-builder/control-components/skill-item-editor";
import LanguagesEditor from "@/components/cv-builder/control-components/languages-editor";
import LanguageItemEditor from "@/components/cv-builder/control-components/languages-item-editor";
import useDndContext from "@/context/dnd-context";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import ProjectsEditor from "@/components/cv-builder/control-components/projects-editor";
import ProjectItemEditor from "@/components/cv-builder/control-components/project-item-editor";


export default function ControlPanel({id}) {
    const {resumeData, controlPanel, currentEditIndex, user, setControlPanelIndex} = useAppContext();
    const [isLoaded, setIsLoaded] = useState(true);
    const {Draggable} = useDndContext();

    useEffect(() => {
        if (id === 'cvnew' && !resumeData.data.name) {
            setControlPanelIndex(ControlPanelView.PersonalDetailsEditor);
        }
        setIsLoaded(false);
    }, [id, resumeData.data.name, setControlPanelIndex]);

    const renderEditors = () => {
        const editors = {
            profile: <ProfileEditor />,
            workExperience: <WorkExperienceEditor />,
            projects: <ProjectsEditor />,
            education: <EducationEditor />,
            courses: <CertificationEditor />,
            skills: <SkillsEditor />,
            languages: <LanguagesEditor />,
            contactInformation: <ContactInformationPreview />,
        };

        let sectionsToRender = [...resumeData.data.order];
        // Backward compatibility
        let missingSections = Object.keys(editors).filter((section) => !sectionsToRender.includes(section));
        sectionsToRender = [...sectionsToRender, ...missingSections];

        return sectionsToRender.map((section, index) => {
            return (
                <Draggable key={section} draggableId={section} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                        >
                            {editors[section]}
                        </div>
                    )}
                </Draggable>
            );
        });
    };










    if (isLoaded)
        return <div>Preparing .... </div>

    return <div id={"ControlPanel"} className={"sidebar:px-6 w-full xl:px-8 2xl:px-10"}>
        <ResumeTitleDownload/>
        {controlPanel === ControlPanelView.MainView && <div>

            <DroppableUtil droppableId={"layout"} type={"LAYOUT"} >
                {renderEditors()}
            </DroppableUtil>
        </div>
        }

        {controlPanel === ControlPanelView.WorkExperienceEditor && <WorkExperienceItemEditor/>
        }


        {controlPanel === ControlPanelView.PersonalDetailsEditor && <ContactInformationEdit/>
        }
        {
            controlPanel === ControlPanelView.EducationEditor && <EducationItemEditor/>
        }

        {
            controlPanel === ControlPanelView.CertificationEditor && <CertificationItemEditor/>

        }


        {controlPanel === ControlPanelView.ProjectsEditor && <ProjectItemEditor/>}

        {
            controlPanel === ControlPanelView.SkillsEditor && <SkillItemEditor/>
        }

        {
            controlPanel === ControlPanelView.LanguagesEditor && <LanguageItemEditor/>
        }
    </div>
}