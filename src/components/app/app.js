import React, { Component }  from 'react';
import nextId from "react-id-generator";

import AppHeader from '../app-header/app-header';
import PostList from '../post-list/post-list';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import SearchPanel from '../search-panel/search-panel';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css';

export default class App extends Component {

  state = {
    data : [
      {label: "Going to learn React", important: true, like: false, id: nextId()},
      {label: "That is so good", important: false, like: false, id: nextId()},
      {label: "Wazzup?", important: false, like: false, id: nextId()}
    ],
    term : '',
    filter : 'all'
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

  addItem = (body) => {
    const newItem = {
      label: body,
      important: false,
      id: nextId()
    }

    this.setState( ({ data }) => {
      const newData = [...data, newItem];
      return { data: newData }
    });
  } 

  toggle = (itemPost, id) => {
    this.setState( ({ data }) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];

      let newItem;
      if (itemPost === 'like') {
        newItem = {...old, like: !old.like};
      }

      if (itemPost === 'important') {
        newItem = {...old, important: !old.important};
      }

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return { data: newArr }     
    })
  }

  onToggleImportant = (id) => {
    this.toggle('important', id);
  }

  onToggleLike = (id) => {
    this.toggle('like', id);
  }

  searchPost = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filterPost = (items, filter) => {
    if (filter === 'like') {
      return items.filter(item => item.like);
    } else {
      return items;
    }
  }

  onUpdateSearch = (term) => {
    this.setState({ term })
  }

  onFilterSelect = (filter) => {
    this.setState({ filter });
  }

  render = () => {
    const { data, term, filter } = this.state;

    const liked = data.filter(item => item.like).length,
          allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term),
    filter);

    return (
      <div className="app">
        <AppHeader 
          liked={ liked }
          allPosts={ allPosts }
        />
  
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={ this.onUpdateSearch } />
          <PostStatusFilter 
            filter={ filter } 
            onFilterSelect={ this.onFilterSelect } 
          />
        </div>
  
        <PostList 
          posts={ visiblePosts } 
          onDelete={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleLike={ this.onToggleLike }
        />

        <PostAddForm onAdd={ this.addItem } />
      </div>
    )
  }
}




