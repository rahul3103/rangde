import React, {Component} from 'react';

class Item extends Component {

  render() {
    const game = this.props.game;

    return (
      <tr>
        <td>{game.title}</td>
        <td data-label="Platform">{game.platform}</td>
        <td data-label="Score">{game.score}</td>
        <td data-label="Genre" dangerouslySetInnerHTML={{ __html: game.genre ? game.genre : '&mdash;' }} />
        <td data-label="Editors Choice">{game.editors_choice}</td>
      </tr>
    );
  }
}

export default Item;