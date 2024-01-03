import React from 'react';

function MainContent(props) {
    return(
        <>
            {props.childContent()}
        </>
    )
}

export default MainContent;