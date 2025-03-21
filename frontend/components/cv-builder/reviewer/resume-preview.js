'use client'
import {useRef} from "react";
import ResumePage from "@/components/cv-builder/reviewer/resume-page";
import ContactInformationCv from "@/components/cv-builder/reviewer/contact-information-cv";
import ProfileCv from "@/components/cv-builder/reviewer/profile-cv";
import WorkExperienceCv from "@/components/cv-builder/reviewer/work-experience-cv";
import EducationSection from "@/components/cv-builder/reviewer/education-preview";
import CoursesCv from "@/components/cv-builder/reviewer/certification-preview";
import SkillsCv from "@/components/cv-builder/reviewer/skills-preview";
import LanguagesSection from "@/components/cv-builder/reviewer/language-preview";
import useAppContext from "@/hooks/useAppContext";
import ProjectsPreview from "@/components/cv-builder/reviewer/projects-preview";

function ResumeContainer({children}) {
    return (
        <div
            className={
                "sidebar:flex sticky top-0 hidden h-screen max-h-screen grow overflow-auto scroll-smooth pb-4 pt-8"
            }
            id={"resumePreview"}
        >
            <div style={{width: "620px", minHeight: "1136px", position: "relative"}}>
                <div
                    style={{
                        transform: "scale(0.780856)",
                        transformOrigin: "top left",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ListContainer({children, cv, className, onClick}) {
    // Target dimensions
    const targetWidth = 180;
    const targetHeight = 250;

    // Original dimensions
    const originalWidth = 620;
    const originalHeight = 1136;

    // Calculate scale to fit within the target container
    const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);

    return (
        <div
            onClick={onClick}
            className={`flex flex-col justify-center items-center cursor-pointer ${className}`}>
            <div
                className="select-none overflow-hidden rounded-md border border-solid border-white hover:opacity-70"
                style={{
                    width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    position: "relative",
                }}>
                {/* Inner scaled content */}
                <div
                    style={{
                        width: `${originalWidth}px`,
                        height: `${originalHeight}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        position: "absolute",
                        pointerEvents: "none",
                        top: 0,
                        left: 0,
                    }}
                >
                    {children}
                </div>
            </div>
            {/* CV Title */}
            <span className="mt-[10px] text-xs font-bold uppercase">{cv.title}</span>
        </div>
    );
}

export default ResumeContainer;


export function ResumePreview({data, isListItemPreview = false}) {
    const contentRef = useRef(null);
    const {resumeData} = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;


    const renderSections = () => {
        const sections = {
            contactInformation: <ContactInformationCv data={data} isListItemPreview={isListItemPreview}/>,
            profile: <ProfileCv data={data} isListItemPreview={isListItemPreview}/>,
            workExperience: (
                <WorkExperienceCv
                    data={data}
                    isListItemPreview={isListItemPreview}
                    className={"mt-2"}
                    droppableId={"work-experience"}
                    type={"WORK_EXPERIENCE"}
                />
            ),
            education: (
                <EducationSection
                    data={data}
                    isListItemPreview={isListItemPreview}
                    className={"mt-2"}
                    droppableId={"education"}
                    type={"EDUCATION"}
                />
            ),
            projects: (
                <ProjectsPreview
                    className={"mt-2"}
                    data={data}
                    isListItemPreview={isListItemPreview}
                    droppableId="projects"
                    type="PROJECTS"
                />
            ),
            courses: (
                <CoursesCv
                    className={"mt-2"}
                    data={data}
                    isListItemPreview={isListItemPreview}
                    droppableId="courses"
                    type="COURSES"
                />
            ),
            skills: (
                <SkillsCv
                    className={"mt-2"}
                    data={data}
                    isListItemPreview={isListItemPreview}
                    droppableId="skills"
                    type="SKILLS"
                />
            ),
            languages: (
                <LanguagesSection
                    className={"mt-2"}
                    data={data}
                    isListItemPreview={isListItemPreview}
                    droppableId="languages"
                    type="LANGUAGES"
                />
            )
        };
        return cvData.data.order.map(section => {
            return sections[section] ? sections[section] : null;
        });
    };
    return <div id="resumePages">
        <ResumePage data={data} isListItemPreview={isListItemPreview} ref={contentRef}>
            {renderSections(data, isListItemPreview)}
        </ResumePage>
    </div>
}

export function ResumePreviewer({data}) {
    return (
        <ResumeContainer>
            <ResumePreview data={data}/>
        </ResumeContainer>
    );
}
