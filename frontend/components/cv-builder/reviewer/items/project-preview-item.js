import useAppContext from "@/hooks/useAppContext";
import DroppableDraggableList from "@/components/cv-builder/utils/droppable-draggable-list";
import DateComponent from "@/components/general/date-component";
import DraggableUtil from "@/components/cv-builder/utils/draggable-util";

const AchievementItem = ({ item, onBlur, globalRefs, itemIndex, subIndex }) => (
    <div
        onFocus={(e) => {
            if (!globalRefs.current[`${itemIndex}-project-achievement-${subIndex}`])
                return;

            globalRefs.current[`${itemIndex}-project-achievement-${subIndex}`].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{__html: item.text}}
        contentEditable
    />
);

const DraggableAchievementList = DroppableDraggableList(AchievementItem);

const ProjectItemBody = ({item}) => {
    return <>
        <div className="flex flex-row justify-between space-y-1">
            <p className="content i-bold">
                {item.link ? (
                    <a
                        href={item.link}
                        aria-label={item.title}
                        title={item.title}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center content underline text-blue-500 hover:text-blue-700"
                    >
                        {item.title}
                    </a>
                ) : (
                    <span>{item.title}</span>
                )}
            </p>
            <DateComponent
                startYear={item.startYear}
                endYear={item.endYear}
                id={`project-date`}
            />
        </div>
        
        {item.description && 
            <p className="content i-bold pl-2 mt-1">
                {item.description}
            </p>
        }
        
        {item.technologies && item.technologies.length > 0 && 
            <p className="content i-bold pl-1 mt-1">
                <span>Technologies: </span>
                <span className="content hyphens-auto">{item.technologies.map(tech => tech.text).join(', ')}</span>
            </p>
        }
    </>;
}

const ProjectItem = ({
    draggableId, index, item, type, keyData, isDraggable
}) => {
    const {updateResumeData, globalRefs} = useAppContext();
    
    const handleAchievementChange = (index, achievementIndex, value) => {
        updateResumeData((prevData) => {
            const newProjects = [...prevData.data.projects];
            newProjects[index].achievements[achievementIndex].text = value;
            return {
                ...prevData,
                data: {
                    ...prevData.data,
                    projects: newProjects
                }
            }
        });
    }
    
    if(!isDraggable){
        return <>
            <ProjectItemBody item={item} />
            
            {item.achievements && item.achievements.length > 0 &&
                <ul className="list-disc ul-padding content">
                    {item.achievements.filter(ach => ach.isShownInPreview).map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>
                            <AchievementItem 
                                item={achievement} 
                                onBlur={(e) => handleAchievementChange(index, achievementIndex, e.target.innerText)}
                                globalRefs={globalRefs} 
                                itemIndex={index} 
                                subIndex={achievementIndex}
                            />
                        </li>
                    ))}
                </ul>
            }
        </>
    }
    
    return <DraggableUtil draggableId={draggableId} index={index} keyData={keyData}>
        <ProjectItemBody item={item} />
        
        <DraggableAchievementList
            itemIndex={index}
            globalRefs={globalRefs}
            items={item.achievements.filter((ach) => ach.isShownInPreview)}
            type={`${type}_ACHIEVEMENT`}
            droppableId={`${type}_ACHIEVEMENT-${index}`}
            OnBlurEvent={(e, achievementIndex) =>
                handleAchievementChange(index, achievementIndex, e.target.innerText)
            }
        />
    </DraggableUtil>
}

export default ProjectItem;