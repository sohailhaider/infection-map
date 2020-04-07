import React, { useState } from 'react';
import Timeline from './Timeline';
import { useAlert } from 'react-alert'

let Upload = props => {
    const alert = useAlert();
    let fileReader;
    
    let [timeline, setTimeline] = useState(null);
    
    
    const handleFileAfterRead = e => {
        try {
            if(!fileReader.result || fileReader.result === '') {
                alert.error("Invalid/Empty file input");
                return;
            }
            const data = JSON.parse(fileReader.result);
            console.log(data.timelineObjects);
            setTimeline(data.timelineObjects);
            
        } catch(e) {
            console.log(e);
            alert.error(e.message);
        }
    }
    
    const handleFileInput = file => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileAfterRead;
        fileReader.readAsText(file);
    }
    
    return (
        <div>
            <input type="file" accept=".json" onChange={e=>handleFileInput(e.target.files[0])} />
            <br/>
            {
                timeline && 
                <Timeline timeline={timeline} />
            }
        </div>
        );
};

export default Upload;