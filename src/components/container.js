import React, { Component } from 'react';
import { modal } from './modal';
import Item from './item';
import SearchBar from './search';
import './container.css';

const db = modal();

class Container extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      games: db.queryAll('games'),
      toggle: true,
      start: 0,
      end: 9
    };
    this.gameSearch = this.gameSearch.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      let newEnd = this.state.end + 10;
      if (newEnd >= this.state.games.length) {
        newEnd = this.state.games.length - 1;
      }
      this.setState ({
        end: newEnd
      });
    }
  }

  gameSearch(term) {
    if (term.length > 0) {
      console.log('called')
      console.log(term)

      let games = db.queryAll('games', {
        query: function(row) {
          if(row.title.match(new RegExp('\\b'+ term + '.*','i'))) {
            return true;
          } else {
            return false;
          }
        }
      });
      console.log(games);
      const start = 0;
      const end = games.length >= 10 ? 9 : games.length - 1;
      this.setState ({
        games,
        start,
        end
      });
    }
    else
      this.setState({games: db.queryAll('games'), start: 0, end: 9});
  }

  sortBy(e) {
    if (this.state.toggle) {
      this.setState({games: this.state.games.sort(function(a, b) {
        return a[e] === b[e] ? 0 : +(a[e] < b[e]) || -1;
        })
      });
      this.setState({toggle: false})
    }
    else {
      this.setState({games: this.state.games.sort(function(a, b) {
        return a[e] === b[e] ? 0 : +(a[e] > b[e]) || -1;
        })
      });
      this.setState({toggle: true})
    }
  }

  render() {
    const list = [];
    for (let i=this.state.start; i<=this.state.end; i++) {
      const game = this.state.games[i];
      list.push(<Item key={game.ID} game={game} />);
    }

    return (
      <div className="main">
        <SearchBar gameSearch={this.gameSearch}/>
        <table className="container">
          <thead>
            <tr>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('title')}></i>Game Title</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('platform')}></i>Platform</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('score')}></i>Score</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('genre')}></i>Genre</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('editors_choice')}></i><span className="head">Editors Choice</span></h1></th>
            </tr>
          </thead>
          <tbody>
            { list }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Container;
