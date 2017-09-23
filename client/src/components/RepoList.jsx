import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {Array.isArray(props.repos)}
      {props.repos.map((repo, i) => (<RepoListEntry key={i} repo={repo}/>))}
    </ul>
  </div>
)

export default RepoList;