import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trades } from '@/models/trades';

export const TradeTable = () => {
  return (
    <Table>
      <TableCaption>交易物々交換リスト</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>場所</TableHead>
          <TableHead>商品</TableHead>
          <TableHead>数</TableHead>
          <TableHead>素材</TableHead>
          <TableHead>数</TableHead>
          <TableHead>スキル</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Trades.map((trade) =>
          trade.material.map((mate) => (
            <TableRow
              key={mate.name}
              className={
                trade.praice === 'ペラ'
                  ? 'text-red-500'
                  : trade.praice === 'カリダ'
                  ? 'text-orange-300'
                  : trade.praice === 'オアシス'
                  ? 'text-blue-300'
                  : 'text-green-500'
              }
            >
              <TableCell>{trade.praice}</TableCell>
              <TableCell>{trade.goods}</TableCell>
              <TableCell>{trade.number}</TableCell>
              <TableCell>{mate.name}</TableCell>
              <TableCell>{mate.number}</TableCell>
              <TableCell>{mate.skill}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
