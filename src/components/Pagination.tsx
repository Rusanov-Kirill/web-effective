import React from 'react';
import { PaginationProps } from '../types/pagination';
import styles from './modules/Pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={styles.pagination}>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    disabled={currentPage === pageNumber}
                    className={styles.pageButton}
                    style={{fontWeight: pageNumber === currentPage ? 'bold' : 'normal',}}>
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
