import React from 'react';
import { Button, ButtonGroup, Select, MenuItem } from '@mui/material';

import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  onPerPageChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageSize, onPageChange, onPerPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handlePerPageChange = (newSize: number): void => {
    onPerPageChange(newSize);
    onPageChange(1);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={`page_${i}`}
          variant={i === currentPage ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className={styles.container}>
      <ButtonGroup>
        {renderPageButtons()}
      </ButtonGroup>
      <Select size='small' value={pageSize} onChange={(event) => handlePerPageChange(event.target.value as number)} className={styles.per_page}>
        <MenuItem value={10}>10 per page</MenuItem>
        <MenuItem value={20}>20 per page</MenuItem>
        <MenuItem value={50}>50 per page</MenuItem>
      </Select>
    </div>
  );
};

export default Pagination;
