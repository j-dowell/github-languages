import React from 'react'
import { isNotEmpty } from './utils/utils';
import Repo from './Repo';

const AllRepos = ({ repos, width, height }) =>
    <>
        {
            repos.map(({repo, languages}) =>
                isNotEmpty(languages) && 
                    <Repo
                        key={repo}
                        repo={repo}
                        languages={languages}
                        width={width / 2 - 50}
                        height={height / 3 - 25}
                    />
            )
        }
    </>

export default AllRepos