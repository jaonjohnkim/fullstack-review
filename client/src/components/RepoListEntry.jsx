import React from 'react';

const RepoListEntry = (props) => (
  <li>
    <div><a href={props.repo.html_url}>{props.repo.name}</a></div>
    <div>{props.repo.description}</div>
  </li>
)

export default RepoListEntry;