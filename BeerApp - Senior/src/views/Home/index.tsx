import { useEffect, useState } from 'react';
import { fetchData, searchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, Link } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import SearchInput from '../../components/SearchInput';

import styles from './Home.module.css';


interface BeerItemProps {
  beer: Beer;
  savedList: Beer[];
  toggleSavedItem: (beer: Beer) => void;
};

const BeerItem: React.FC<BeerItemProps> = ({ beer, savedList, toggleSavedItem }) => {
  return (
    <li>
      <Checkbox
        name={beer.name}
        value={beer.name}
        onChange={() => toggleSavedItem(beer)}
        checked={savedList.some((savedBeer) => JSON.stringify(savedBeer) === JSON.stringify(beer))}
      />
      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );
};
// -------------------------------------------------------------

interface SavedItemProps {
  item: Beer;
};

const SavedItem: React.FC<SavedItemProps> = ({ item }) => {
  return (
    <li>
      <Checkbox />
      <Link component={RouterLink} to={`/beer/${item.id}`}>
        {item.name}
      </Link>
    </li>
  );
};


interface SavedItemsListProps {
  savedList: Beer[];
};
// -------------------------------------------------------------

const SavedItemsList: React.FC<SavedItemsListProps> = ({ savedList }) => {
  return (
    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3 className={styles.customSavedItemsHeader}>Saved items {!!savedList?.length && `(${savedList?.length})`}</h3>
          <Button variant="contained" size="small">
            Remove all items
          </Button>
        </div>
        <ul className={styles.list}>
          {savedList.map((beer) => (
            <SavedItem key={`${beer.id}_savedItem`} item={beer} />
          ))}
          {!savedList.length && <p>No saved items</p>}
        </ul>
      </div>
    </Paper>
  );
};
// -------------------------------------------------------------

const Home = () => {
  const [storedList] = useLocalStorage('SAVED_LIST', []);

  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(storedList);

  // eslint-disable-next-line
  useEffect(() => fetchData(setBeerList), []);

  const toggleSavedItem = (beer: Beer) => {
    let updatedSavedList = [...savedList];
    const beerString = JSON.stringify(beer);
    
    const isCheckedItem = savedList.some((savedBeer) => JSON.stringify(savedBeer) === beerString);

    if (isCheckedItem) {
      updatedSavedList = updatedSavedList.filter((savedBeer) => JSON.stringify(savedBeer) !== beerString);
    } else {
      updatedSavedList.push(beer);
    }

    setSavedList(updatedSavedList);
    saveSavedList(updatedSavedList);
  };

  const handleSearch = (value: string, searchQuery: string) => {
    if (value !== searchQuery) {
      searchData(setBeerList, value);
    } else {
      fetchData(setBeerList);
    }
  };

  const saveSavedList = (updatedSavedList: Beer[]) => {
    localStorage.setItem('SAVED_LIST', JSON.stringify(updatedSavedList))
  };

  const handleReloadList = () => {
    fetchData(setBeerList);
	};

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <SearchInput onSearch={handleSearch}>
                <Button variant="contained" onClick={handleReloadList}>Reload list</Button>
              </SearchInput>
              <ul className={styles.list}>
                {beerList.map((beer) => (
                  <BeerItem
                    key={beer.id}
                    beer={beer}
                    savedList={savedList}
                    toggleSavedItem={toggleSavedItem}
                  />
                ))}
              </ul>
            </div>
          </Paper>

          <SavedItemsList savedList={savedList} />
        </main>
      </section>
    </article>
  );
};

export default Home;
