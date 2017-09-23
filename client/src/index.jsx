import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentWillMount() {
    this.load();
  }

  load () {
    var promiseSearch = $.ajax('/repos', {
      method: 'GET'
    });
    promiseSearch.done(data => this.setState({repos: data}));
    promiseSearch.fail(err => console.error(err));
  }

  search (term) {
    console.log(`${term} was searched`);
    var promiseSearch = $.ajax('/repos', {
      method: 'POST',
      data: term,
      contentType: 'text/plain',
      dataType: 'text'
    });
    promiseSearch.done(data => this.setState({repos: JSON.parse(data)}));
    promiseSearch.fail(err => console.error(err));
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));