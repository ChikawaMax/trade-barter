'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Trades } from '@/models/trades';
import { HeaderObj } from '@/models/HeaderObj';

export const TradeTable = () => {
  const [sortColumn, setSortColumn] = useState<string | number>('praice');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);

  const sortedTrades = useMemo(() => {
    return Trades.flatMap((trade) =>
      trade.material.map((material, index) => ({
        ...trade,
        material: [material],
        materialIndex: index,
      }))
    ).sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortColumn) {
        case 'goods':
          aValue = a.goods;
          bValue = b.goods;
          break;
        case 'praice':
          aValue = a.praice;
          bValue = b.praice;
          break;
        case 'number':
          aValue = a.number;
          bValue = b.number;
          break;
        case 'materialName':
          aValue = a.material[0].name;
          bValue = b.material[0].name;
          break;
        case 'materialNumber':
          aValue = a.material[0].number;
          bValue = b.material[0].number;
          break;
        case 'materialSkill':
          aValue = a.material[0].skill;
          bValue = b.material[0].skill;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [Trades, sortColumn, sortDirection]);

  const handleSort = (column: string | number) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (trade: Trade, index: number) => {
    const tradeId = `${trade.goods}-${index}`;
    if (selectedTrades.includes(tradeId)) {
      setSelectedTrades(selectedTrades.filter((id) => id !== tradeId));
    } else {
      setSelectedTrades([...selectedTrades, tradeId]);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {HeaderObj.map((Header) => (
              <TableHead
                key={Header.column}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort(Header.column)}
              >
                {Header.children}
                {sortColumn === Header.column && (
                  <span className="ml-2">
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTrades.map((trade, index) => (
            <TableRow
              key={`${trade.goods}-${index}`}
              className={
                selectedTrades.includes(`${trade.goods}-${index}`)
                  ? 'bg-gray-700 hover:bg-gray-800'
                  : trade.praice === 'ペラ'
                  ? 'text-red-400'
                  : trade.praice === 'オアシス'
                  ? 'text-blue-400'
                  : trade.praice === 'カリダ'
                  ? 'text-orange-300'
                  : 'text-green-300'
              }
              onClick={() => handleRowClick(trade, index)}
            >
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`trade-${trade.goods}-${index}`}
                    checked={selectedTrades.includes(`${trade.goods}-${index}`)}
                  />
                  <Label
                    htmlFor={`trade-${trade.goods}-${index}`}
                    className="cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell>{trade.praice}</TableCell>
              <TableCell>{trade.goods}</TableCell>
              <TableCell>{trade.number}</TableCell>
              <TableCell>{trade.material[0].name}</TableCell>
              <TableCell>{trade.material[0].number}</TableCell>
              <TableCell>{trade.material[0].skill}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
