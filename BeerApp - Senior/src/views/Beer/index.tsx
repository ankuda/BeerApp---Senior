import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import GoBackBtn from '../../components/Buttons/GoBackBtn';

import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => fetchData(setBeer, id), [id]);

  const { 
    brewery_type, 
    address_1, 
    city, 
    state_province,
    postal_code, 
    country, 
    phone, 
    website_url,
  } = beer || {};

  return (
    <article style={{ height: 'calc(100vh - 169px)' }}>
       <section className={styles.container}>
          <GoBackBtn />
          <header>
            <h1>{beer?.name}</h1>
          </header>
          <main>
            <div className={styles.beerContainer}>
              <div className={styles.img} />
              <ul className={styles.beerList}>
                <li><b>Type: </b> {brewery_type}</li>
                <li><b>Address: </b> {address_1}, {postal_code}, {city}, {state_province}, {country}</li>
                {phone && (<li><b>Phone: </b> <a href={`tel:${phone}`}>{phone}</a></li>)}
                {website_url && (<li><b>Website: </b> <a href={website_url} target='_blank' rel="noreferrer">{website_url}</a></li>)}
              </ul>
            </div>
          </main>
      </section>
    </article>
  );
};

export default Beer;
