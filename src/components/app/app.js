import React, { Component }  from 'react';

import AppHeader from '../app-header/app-header';
import PostList from '../post-list/post-list';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import SearchPanel from '../search-panel/search-panel';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css';

export default class App extends Component {
  state = {
    data : [
      {label: "Going to learn React", important: true, id: 'dffjh'},
      {label: "That is so good", important: false, id: 'u6uty'},
      {label: "Wazzup?", important: false, id: 'bnmbn'}
    ]
  }

  deleteItem = (id) => {
    this.setState( ({ data }) => {
      const index = data.findIndex(elem => elem.id === id);

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newData = [...before, ...after];

      return { data: newData }
    });
  }

  render = () => {
    return (
      <div className="app">
        <AppHeader />
  
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
  
        <PostList 
          posts={ this.state.data } 
          onDelete={ this.deleteItem }
        />
        <PostAddForm />
      </div>
    )
  }
}




