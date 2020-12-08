import React  from 'react';

import PostListItem from '../post-list-item/post-list-item';

import './post-list.css';

const PostList = ({posts}) => {

  const elements = posts.map(elem => {
    if (typeof elem === 'object' && isEmpty(elem)) {
      const {id, ...elemProps} = elem;

      return (
        <li key={id} className="list-group-item">
          <PostListItem {...elemProps} />
        </li>
      )
    }
  })

  function isEmpty(obj) {
    for (let key in obj) {
      return true;
    }
    return false;
  }

  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  )
};

export default PostList;