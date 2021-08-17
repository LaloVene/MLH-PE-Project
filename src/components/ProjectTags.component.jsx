import { TagText } from './ProjectCard.styles';
import { IonChip } from '@ionic/react';

const ProjectTags = ({ title, tagType, limit }) => {
    var showTags = tagType;
    // console.log(showTags)
    var hiddenTagCount = 0;
    if (limit && showTags) {
        if (title === "Tags") {
            showTags = tagType.slice(0, 2);
            hiddenTagCount = (tagType.length - 2)
        } else {
            showTags = tagType.slice(0, 3);
            hiddenTagCount = (tagType.length - 3)
        }
    }
    return (
        <TagText>
            <strong>{title}: </strong><br />
            {showTags && showTags.length !== 0 ? showTags.map((item) => (
                <IonChip key={item} style={{ backgroundColor: "#acc1f8" }}>{item}</IonChip>
            )) : <i>None listed</i>}
            {(limit & (hiddenTagCount > 0)) ? ("+ " + parseInt(hiddenTagCount) + " more") : ""}
        </TagText>
    )
}

export default ProjectTags;