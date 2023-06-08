import { useEffect, useState } from 'react';
import { Beer, SORT } from '../../types';
import { fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Select, MenuItem } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

import SearchInput from '../../components/SearchInput';
import { searchData } from '../Home/utils';
import Pagination from '../../components/Pagination';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<SORT>('type,name:asc');


  useEffect(() => {
    fetchData(setBeerList, { sort: `type,name:${sortOrder}` });
  }, [sortOrder]);

  useEffect(() => {
    if (beerList?.length) {
      const amountOfPages = Math.ceil(beerList?.length / currentPerPage);
      setTotalPages(amountOfPages);
    }
  }, [beerList, currentPerPage]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleSearch = (value: string, searchQuery: string) => {
    if (value !== searchQuery) {
      searchData(setBeerList, value);
    } else {
      fetchData(setBeerList, { sort: `type,name:${sortOrder}` });
    }
  };

  const handleOrderChange = (event: any) => {
    setSortOrder(event.target.value);
  };


  const startIndex = (currentPage - 1) * currentPerPage;
  const itemsToShow = beerList.slice(
    startIndex,
    startIndex + currentPerPage
  );

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page ({beerList?.length})</h1>

          <SearchInput onSearch={handleSearch}>
            <div>
              <label htmlFor='sortOrder'>Order:</label>
              <Select id='sortOrder' size='small' value={sortOrder} onChange={handleOrderChange}>
                <MenuItem value='type,name:asc'>Ascending</MenuItem>
                <MenuItem value='type,name:desc'>Descending</MenuItem>
              </Select>
            </div>
          </SearchInput>
        </header>
        <main>
          <List>
            {itemsToShow.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <Pagination 
            currentPage={currentPage || 1} 
            totalPages={totalPages} 
            pageSize={currentPerPage}
            onPageChange={setCurrentPage} 
            onPerPageChange={setCurrentPerPage}
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
