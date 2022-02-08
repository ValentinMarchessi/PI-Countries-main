import { useState, useEffect } from 'react';
import style from './ButtonSelect.module.scss';

export default function ButtonSelect({ options, handler }) {
	const [selected, setSelected] = useState('');
	const [buttons, setButtons] = useState([]);

	useEffect(() => {
		function handleButton(event) {
			const { value } = event.target;
			selected !== value ? setSelected(value) : setSelected('');
			selected !== value ? handler(value) : handler('');
		}

		if (options)
			setButtons(
				options.map((option) => {
					//option.value == selected es seguro, es una comparación number == 'number' en caso de que option.value sea un número,
                    let className = '';
                    if (option.value == selected) className = 'selected';
					return (
						<button className={className} key={option.value} value={option.value} onClick={handleButton}>
							{option.name}
						</button>
					);
				})
			);
	}, [selected, setButtons, options, handler]);

	return options && options.length ? <div className={style.buttonSelect}>{buttons}</div> : <h1 id={style.optionError}>No options available.</h1>;
}