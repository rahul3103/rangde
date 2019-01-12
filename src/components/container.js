import React, { Component } from 'react';
import Item from './item';
import SearchBar from './search';
import './container.css';

class Container extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      games: [],
      toggle: true,
      start: 0,
      end: 0
    };
    this.gameSearch = this.gameSearch.bind(this);
    this.gameFilter = this.gameFilter.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentWillMount() {
    const self = this;
    fetch('https://demo2837922.mockable.io/gamesarena').then(function(response) {
      const contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    }).then(function(json) {
        const games = json.slice(1);
        const start = 0;
        const end = games.length >= 10 ? 9 : games.length - 1;
        self.setState({
          games,
          start,
          end
        });
        localStorage.setItem("games", JSON.stringify(json.slice(1)));
    }).catch(function(error) { console.log(error); });
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
    const fullgames = JSON.parse(localStorage.getItem('games'))
    if (term.length > 0) {
      const games = fullgames.filter(game => game.title.match(new RegExp('\\b'+ term + '.*','i')));
      const start = 0;
      const end = games.length >= 10 ? 9 : games.length - 1;
      this.setState ({
        games,
        start,
        end
      });
    }
    else {
      this.setState({games: fullgames});
    }
  }

  gameFilter(term) {
    const fullgames = JSON.parse(localStorage.getItem('games'))
    let games = []
    if (term === 'All') {
      games = fullgames;
    }
    else {
      console.log(term)
      console.log(fullgames.filter(game => game.platform === 'Android'))
      games = fullgames.filter(game => game.platform === term);
    }
    console.log(games.length)
    const start = 0;
    const end = games.length >= 10 ? 9 : games.length - 1;
    this.setState ({
      games,
      start,
      end
    });
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
    if (this.state.games.length > 0) {
      for (let i=this.state.start; i<=this.state.end; i++) {
        const game = this.state.games[i];
        list.push(<Item key={i} game={game} />);
      }
    }

    return (
      <div className="main">
        <SearchBar 
          gameSearch={this.gameSearch}
          gameFilter={this.gameFilter}
        />
        <table className="container">
          <thead>
            <tr>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('title')}></i>Game Title</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('platform')}></i>Platform</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('score')}></i>Score</h1></th>
              <th><h1><i className="fa fa-sort sort" aria-hidden="true" onClick={()=>this.sortBy('genre')}></i>Genre</h1></th>
              <th><h1><i className="fa fa-sort sort head" aria-hidden="true" onClick={()=>this.sortBy('editors_choice')}></i><span>Editors Choice</span></h1></th>
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
