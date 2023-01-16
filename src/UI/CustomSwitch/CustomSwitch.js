import React, { useState } from 'react';

const CustomSwitch = () => {
  	const [active, setActive] = useState(true);
	return (
		<div
			className={`w-8 h-5 relative rounded-xl cursor-pointer shadow-inner duration-500 ${''}`}
			style={{ backgroundColor: active ? '#3AE374' : '#A7A7A7' }}
			onClick={() => {
				setActive(!active);
			}}
		>
			<div className={`w-3 h-3 rounded-full absolute bg-slate-50 top-1  duration-100 ${active ? 'left-4' : 'left-1'}`}></div>
		</div>
	);
};
export default CustomSwitch;
