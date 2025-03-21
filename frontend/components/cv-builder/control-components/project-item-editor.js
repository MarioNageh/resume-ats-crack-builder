import useAppContext from "@/hooks/useAppContext";
import {useEffect, useState} from "react";
import { FaCheckCircle } from "react-icons/fa";
import TextInput from "@/components/general/text-input";
import Grid from "@/components/general/grid";
import Card from "@/components/general/card";
import {ControlPanelMode, ControlPanelView} from "@/components/cv-builder/control-components/utils/enums";
import NotesEditor from "@/components/cv-builder/control-components/notes-editor";

const ProjectItemEditor = ({}) => {
    const {resumeData, setResumeData, setControlPanelIndex, currentEditIndex, syncResumeData} = useAppContext();
    const [originalProject, setOriginalProject] = useState({});
    const index = currentEditIndex.index;
    const project = resumeData.data.projects[index];
    const mode = currentEditIndex.mode;

    useEffect(() => {
        setOriginalProject(JSON.parse(JSON.stringify(project)));
    }, [project]);

    const handleCancel = () => {
        let oldState = resumeData;
        if (mode === ControlPanelMode.Add) {
            const projects = [...resumeData.data.projects];
            projects.pop();
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    projects: projects,
                },
            }
        } else {
            const projects = [...resumeData.data.projects];
            projects[index] = originalProject;
            oldState = {
                ...resumeData,
                data: {
                    ...resumeData.data,
                    projects: projects,
                },
            }
        }
        syncResumeData(oldState);
        setResumeData(oldState);
        setControlPanelIndex(ControlPanelView.MainView);
    };

    const handleSave = () => {
        setControlPanelIndex(ControlPanelView.MainView);
        syncResumeData(resumeData);
    };

    const onChangeInput = (e) => {
        const inputName = e.target.name.slice(2);
        const camelCaseInputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        const newProjects = [...resumeData.data.projects];
        newProjects[index][camelCaseInputName] = e.target.value;
        setResumeData({
            ...resumeData,
            data: {
                ...resumeData.data,
                projects: newProjects,
            },
        });
    };

    return (
        <div className={"sidebar:max-w-none sidebar:px-0 w-full max-w-[800px] px-3 pb-16"}>
            <div className={"w-full pb-8"}>
                <div>
                    <Card className={"px-5 md:px-7 lg:px-9 py-5 pb-5 md:py-7 md:pb-9 lg:py-9 lg:pb-10 relative"}>
                        <div id={"Top-Part"}>
                            <Grid cols={"auto_min-content"} className={"mb-4 gap-2 "}>
                                <h3 className="text-xl font-extrabold md:text-2xl">
                                    {currentEditIndex.mode === ControlPanelMode.Add ? 'Add' : 'Edit'} Project
                                </h3>
                            </Grid>
                            <Grid cols={1} className="w-full md:grid-cols-[auto_min-content] md:gap-6 xl:gap-8">
                                <div className="order-2 md:order-1">
                                    <TextInput
                                        onChange={onChangeInput}
                                        value={project.title}
                                        className={"mb-4"} name="cvTitle" type={"text"}
                                        title="Project Title" hint="Enter Project Title"
                                        isRequired={true}/>
                                </div>
                            </Grid>

                            <div className="mt-4">
                                <div>
                                    {/*Dates*/}
                                    <div className="flex w-full space-x-4 items-center">
                                        <TextInput
                                            onChange={onChangeInput}
                                            value={project.startYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvStartYear"
                                            type={"date"}
                                            title="Start Date"
                                            isRequired={true}
                                            pattern="\d{4}-\d{2}-\d{2}"
                                        />

                                        <TextInput
                                            onChange={onChangeInput}
                                            value={project.endYear}
                                            className={"mb-4 w-1/2"}
                                            name="cvEndYear"
                                            type={"date"}
                                            title="End Date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            isRequired={false}
                                        />
                                    </div>

                                    {/*Link*/}
                                    <div className="order-2 md:order-1">
                                        <TextInput
                                            onChange={onChangeInput}
                                            value={project.link}
                                            className={"mb-4"} name="cvLink" type={"text"}
                                            title="Project Link" hint="Enter Project URL"
                                            isRequired={false}/>
                                    </div>
                                    
                                    {/*Description*/}
                                    <div className="order-2 md:order-1">
                                        <TextInput
                                            onChange={onChangeInput}
                                            value={project.description}
                                            className={"mb-4"} name="cvDescription" type={"text"}
                                            title="Project Description" hint="Enter Project Description"
                                            isRequired={true}
                                            multiline={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/*Technologies*/}
                <NotesEditor type={"project-technologies"} index={index}
                         draggableId={"project-technologies"} section={"projects"} 
                         addTitle={"Add Technology"} titleSection={"Technologies"}
                         subSection={"technologies"} IsCardExpanded={true}
                />

                {/*Achievements*/}
                <NotesEditor type={"project-achievements"} index={index}
                         draggableId={"project-achievements"} section={"projects"}
                         addTitle={"Add Achievement"} titleSection={"Achievements"}
                         subSection={"achievements"} IsCardExpanded={true}
                />

                {/*Save Cancel*/}
                <Card className={"fixed bottom-0 left-0 right-0 z-[20] flex justify-between gap-2 bg-white p-4 px-5 sm:sticky sm:left-auto sm:right-auto sm:mb-6 sm:mt-6 sm:gap-4 md:px-7 lg:px-9"}>
                    <div className="flex items-center justify-start"></div>
                    <div className="flex space-x-1 sm:space-x-7">
                        <button type="button" onClick={handleCancel}
                                className="border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 hover:opacity-80 py-2 rounded-full text-primaryBlack font-extrabold h-12 min-w-min px-4 text-[16px]">
                            Cancel
                        </button>
                        <button onClick={handleSave}
                                className="border-none cursor-pointer appearance-none touch-manipulation flex items-center focus-visible:outline-blue-600 hover:opacity-80 px-7 py-2 rounded-full font-extrabold min-w-[120px] text-white bg-gradientPinkRed h-12 justify-between pl-4 text-[16px]">
                            <span className="border-r border-solid border-gray-100 border-opacity-60 pr-3">
                                <FaCheckCircle sx={{fontSize: 20}} className="text-white"/>
                            </span>
                            <span className="pr flex justify-center pl-5">Save</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProjectItemEditor;