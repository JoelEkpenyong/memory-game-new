import React from 'react';
import './Navbar.css';

export default function Navbar({ onNewGame }) {
	return (
		<header>
			<h2>
				<button>Memory Game </button>
			</h2>
			<nav>
				<button onClick={onNewGame}>New Game</button>
			</nav>
		</header>
	);
}
