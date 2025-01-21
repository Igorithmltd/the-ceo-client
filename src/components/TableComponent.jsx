import React, { useState, useEffect } from 'react'
import PaginationFooter from './PaginationFooter';
import { Link } from 'react-router-dom';
import tableData from '../data/small.json'

const TableComponent = ({ page }) => {
    const [data, setData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        // Simulating fetching data based on the page
        setData(tableData[page]);
    }, [page]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { headers, rows, footer } = data;


    return (
        <div className="pt-8 pb-4 border border-gray-300 rounded-md">
            <div className="overflow-x-auto">
                <div className="max-h-[55vh] overflow-y-auto scrollbar-thin">
                    {/* Shared table for both header and body */}
                    <table className="min-w-full table-fixed border-collapse text-nowrap">
                        <thead className="bg-gray-400 sticky top-0">
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className={`w-1/${headers.length} px-4 py-2 border ${index < 2 ? 'text-left' : 'text-center'
                                            }`}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                >
                                    {headers.map((header, cellIndex) => {
                                        let cellValue = row[header.toLowerCase().replace(' ', '')] || ''; // Dynamic key access


                                        let cellClass = '';
                                        if (header === 'Status') {
                                            cellClass =
                                                cellValue.toLowerCase() === 'active'
                                                    ? 'text-green-500'
                                                    : 'text-yellow-500';
                                        }

                                        // Special case for the fourth column (index 3) - Blue text and underline
                                        if (cellIndex === 3) {
                                            cellClass = 'text-blue-500 underline';
                                        }

                                        return (
                                            <td
                                                key={cellIndex}
                                                className={`px-4 py-2 border ${cellIndex < 2 ? 'text-left' : 'text-center'
                                                    } ${cellClass}`}
                                            >
                                                {cellValue}
                                            </td>
                                        );
                                    })}
                                </tr>


                            ))
                            }
                        </tbody>
                    </table>
                </div>
                {footer && (
                    <div className="flex justify-between items-center mt-4 px-4">
                        <Link to={footer.link} className="text-blue-500 underline">
                            {footer.text}
                        </Link>
                        <PaginationFooter
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
            {/* Footer with link and pagination */}
            
        </div>
    );
};

export default TableComponent;
