import React, { useState, useEffect } from 'react';
import './box.css';

function Box({ bgColor, index, onclick, currColor, matchedPair, unMatched, clearTiles }) {
	const [ visualState, setvisualState ] = useState('closed');

	useEffect(
		() => {
			if (visualState === 'opened') {
				if (currColor === bgColor && bgColor !== '') {
					console.log('same');
					matchedPair();
					return;
				}
				console.log('not same');
				clearTiles();
				unMatched();
			}
		},
		[ visualState, currColor, bgColor, matchedPair, unMatched, clearTiles ]
	);

	return (
		<button
			className="box"
			type="button"
			name={index}
			value={bgColor}
			style={{ backgroundColor: bgColor }}
			onClick={(e) => {
				onclick(e);
				setvisualState('opened');
				// checkColors();
			}}
		/>
	);
}

export default Box;
