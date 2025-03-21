import React from 'react';
import useAppContext from "@/hooks/useAppContext";
import DroppableUtil from "@/components/cv-builder/utils/droppable-utils";
import ProjectItem from "@/components/cv-builder/reviewer/items/project-preview-item";

function ProjectPreviewBody(item, filteredProjects, type, isDraggable) {
    return <>
        <h2
            className="section-title mb-1 border-b-2 border-gray-300 editable"
            contentEditable
            suppressContentEditableWarning
        >
            {item.data.titles.projects}
        </h2>
        {filteredProjects.map((projectItem, index) => {
            return <ProjectItem type={type} keyData={`${projectItem.title}-${index}`}
                              key={`${projectItem.title}-${index}`}
                              item={projectItem} index={index}
                              isDraggable={isDraggable}
                              draggableId={`${type}-${index}`}/>
        })}
    </>;
}

const ProjectsPreview = ({data, isListItemPreview, droppableId, type, className}) => {
    const {resumeData} = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredProjects = item.data.projects.filter(project => project.isShownInPreview);
    
    if (!filteredProjects || !filteredProjects.length) return null;
    
    const isDraggable = !isListItemPreview;
    
    if (!isDraggable) {
        return <div className={`${className}`}>
            {ProjectPreviewBody(item, filteredProjects, type, isDraggable)}
        </div>
    }
    
    return <DroppableUtil droppableId={droppableId} type={type} className={`${className}`}>
        {ProjectPreviewBody(item, filteredProjects, type, isDraggable)}
    </DroppableUtil>
}

export default ProjectsPreview;