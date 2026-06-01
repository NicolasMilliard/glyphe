import type { ReactNode } from 'react';

import { Text } from '@/components/ui';

type DocsTableColumn<TRow> = {
  header: string;
  render: (row: TRow) => ReactNode;
};

type DocsTableProps<TRow> = {
  columns: readonly DocsTableColumn<TRow>[];
  getRowKey: (row: TRow) => string;
  rows: readonly TRow[];
};

function DocsTable<TRow>({ columns, getRowKey, rows }: DocsTableProps<TRow>) {
  return (
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className="w-full min-w-160 border-collapse text-left">
        <thead className="bg-muted/40">
          <tr className="border-border border-b">
            {columns.map((column) => (
              <th key={column.header} scope="col" className="px-4 py-3">
                <Text intent="caption" tone="muted" weight="medium">
                  {column.header}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-3 align-top">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DocsTable };
export type { DocsTableColumn };
