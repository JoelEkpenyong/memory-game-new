import React from 'react';
import shuffle from 'shuffle-array';
import Card from './Card';
import Navbar from './Navbar';

const CardState = {
	HIDING: 0,
	SHOWING: 1,
	MATCHING: 2
};

export default class App extends React.Component {
	constructor(props) {
		super(props);

		// The cards that we will use for our state.
		let cards = [
			{ id: 0, cardState: CardState.HIDING, backgroundColor: 'red' },
			{ id: 1, cardState: CardState.HIDING, backgroundColor: 'red' },
			{ id: 2, cardState: CardState.HIDING, backgroundColor: 'navy' },
			{ id: 3, cardState: CardState.HIDING, backgroundColor: 'navy' },
			{ id: 4, cardState: CardState.HIDING, backgroundColor: 'green' },
			{ id: 5, cardState: CardState.HIDING, backgroundColor: 'green' },
			{ id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow' },
			{ id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow' },
			{ id: 8, cardState: CardState.HIDING, backgroundColor: 'black' },
			{ id: 9, cardState: CardState.HIDING, backgroundColor: 'black' },
			{ id: 10, cardState: CardState.HIDING, backgroundColor: 'purple' },
			{ id: 11, cardState: CardState.HIDING, backgroundColor: 'purple' },
			{ id: 12, cardState: CardState.HIDING, backgroundColor: 'pink' },
			{ id: 13, cardState: CardState.HIDING, backgroundColor: 'pink' },
			{ id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' },
			{ id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' }
		];

		cards = shuffle(cards);
		this.state = { cards, noClick: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
	}

	handleClick(id) {
		const mapCardState = (cards, idsToChange, newCardState) => {
			return cards.map((c) => {
				if (idsToChange.includes(c.id)) {
					return {
						...c,
						cardState: newCardState
					};
				}
				return c;
			});
		};

		const foundCard = this.state.cards.find((c) => c.id === id);

		if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
			return;
		}

		let noClick = false;

		let cards = mapCardState(this.state.cards, [ id ], CardState.SHOWING);

		const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);

		const ids = showingCards.map((c) => c.id);

		if (showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
			cards = mapCardState(cards, ids, CardState.MATCHING);
		} else if (showingCards.length === 2) {
			let hidingCards = mapCardState(cards, ids, CardState.HIDING);

			noClick = true;

			this.setState({ cards, noClick }, () => {
				setTimeout(() => {
					// set the state of the cards to HIDING after 1.3 seconds
					this.setState({ cards: hidingCards, noClick: false });
				}, 400);
			});
			return;
		}

		this.setState({ cards, noClick });
	}

	handleNewGame() {
		let cards = this.state.cards.map((c) => ({
			...c,
			cardState: CardState.HIDING
		}));
		cards = shuffle(cards);
		this.setState({ cards });
	}

	render() {
		const card = this.state.cards.map((card, i) => (
			<Card
				key={card.id}
				showing={card.cardState !== CardState.HIDING}
				backgroundColor={card.backgroundColor}
				onClick={() => this.handleClick(card.id)}
			/>
		));
		return (
			<div>
				<Navbar onNewGame={this.handleNewGame} />
				{card}
			</div>
		);
	}
}
