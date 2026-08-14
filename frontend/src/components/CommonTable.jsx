import React from 'react';

const CommonTable = ({ headers, data, renderRow, emptyMessage = 'No records found' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-royal-gold/20 shadow-lg bg-white/50 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-royal-emeraldDark text-royal-gold border-b border-royal-gold/30">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider font-serif"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/65">
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-royal-gold/5 transition-colors duration-150 text-gray-800 text-xs sm:text-sm"
              >
                {renderRow(row, index)}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-10 text-center text-gray-500 font-medium italic"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
