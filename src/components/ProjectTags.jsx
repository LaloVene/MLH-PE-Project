import { TagText } from './ProjectCardStyles';
import { IonChip } from '@ionic/react';

const ProjectTags = ({ title, tagType, limit }) => {
    var showTags = tagType;
    console.log(showTags)
    var hiddenTagCount = 0;
    if (limit) {
        showTags = tagType.slice(0, 3);
        hiddenTagCount = (tagType.length - 3)
    }
    return (
        <TagText>
            <strong>{title}: </strong><br />
            {showTags != "" ? showTags.map((item) => (
                <IonChip key={item} style={{ backgroundColor: "#acc1f8" }}>{item}</IonChip>
            )) : <i>None listed</i>}
            {(limit & (hiddenTagCount > 0)) ? ("+ " + parseInt(hiddenTagCount) + " more") : ""}
        </TagText>
    )
}

export default ProjectTags;