import React from 'react'
import Repo from './Repo';

const Total = React.memo(({ languages, width, height }) => 
    <div>
        <Repo
            languages={languages}
            width={width}    
            height={height}
        />
    </div>
)
export default Total