import React from 'react';
import './FaceRecognition.css';

//pure function with no state
//destructure imageUrl and pass as parameter
const FaceRecognition = ({ imageUrl, box }) => {
    return (
        //display image
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                {/* create new div that just displays the border for the bounding box on faces */}
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
            
        </div>
    )
}

export default FaceRecognition;