import React, { useEffect, useState } from 'react';
import Context from './context';

const ContextProvider = (props) => {
	const [title, setEndActionTitle] = useState(null);
	const [actionWarning, setActionWarning] = useState(false);
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		if (title) {
			setTimeout(() => {
				setEndActionTitle(null);
				setActionWarning(false);
			}, 3000);
		}
	}, [title]);

	const context = {
		title,
		setEndActionTitle,
		actionWarning,
		setActionWarning,
		subCategories,
		setSubCategories,
	};

	return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
