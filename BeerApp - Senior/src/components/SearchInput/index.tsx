import { useState, useCallback } from 'react';
import { TextField, debounce } from '@mui/material';

import styles from '../../views/Home/Home.module.css';

interface SearchInputProps {
	onSearch: (value: string, searchQuery: string) => void;
	debounceTime?: number;
	children?: React.ReactNode;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, children, debounceTime = 300 }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			onSearch(value, searchQuery);
		}, debounceTime)
	, []);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value.replace(/\s\s+/g, ' ');

		setSearchQuery(newValue);
		debouncedSearch(newValue);
	};

	return (
		<div className={styles.listHeader} >
			<TextField
				label="Filter..."
				value={searchQuery}
				onChange={handleSearchChange}
				variant="outlined"
			/>
			{children}
		</div>
	);
};

export default SearchInput;
