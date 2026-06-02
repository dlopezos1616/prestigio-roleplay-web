'use client';

import { NormativaBlock as NormativaBlockType } from '@/lib/normativas';

interface NormativaBlockProps {
  block: NormativaBlockType;
}

const blockConfig: Record<string, { icon: string; label: string; className: string; titleColor: string; bulletColor: string }> = {
  definition: {
    icon: '📖',
    label: 'Definición',
    className: 'block-definition',
    titleColor: '#00b4ff',
    bulletColor: '#00b4ff',
  },
  allowed: {
    icon: '✅',
    label: 'Permitido',
    className: 'block-allowed',
    titleColor: '#22c55e',
    bulletColor: '#22c55e',
  },
  forbidden: {
    icon: '❌',
    label: 'No permitido',
    className: 'block-forbidden',
    titleColor: '#ef4444',
    bulletColor: '#ef4444',
  },
  sanction: {
    icon: '⚖️',
    label: 'Sanción',
    className: 'block-sanction',
    titleColor: '#f59e0b',
    bulletColor: '#f59e0b',
  },
  example: {
    icon: '💡',
    label: 'Ejemplo',
    className: 'block-example',
    titleColor: '#8b5cf6',
    bulletColor: '#8b5cf6',
  },
  warning: {
    icon: '⚠️',
    label: 'Advertencia',
    className: 'block-warning',
    titleColor: '#f97316',
    bulletColor: '#f97316',
  },
  info: {
    icon: 'ℹ️',
    label: 'Información',
    className: 'block-info',
    titleColor: '#9ca3af',
    bulletColor: '#637381',
  },
  table: {
    icon: '📊',
    label: 'Tabla',
    className: 'block-table',
    titleColor: '#00b4ff',
    bulletColor: '#00b4ff',
  },
};

export default function NormativaBlockComponent({ block }: NormativaBlockProps) {
  const config = blockConfig[block.type] || blockConfig.info;

  // Table block
  if (block.type === 'table' && block.headers && block.rows) {
    return (
      <div className={`${config.className} p-4 mb-3`}>
        {block.title && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">{config.icon}</span>
            <h4 className="text-sm font-bold" style={{ color: config.titleColor }}>
              {block.title}
            </h4>
          </div>
        )}
        <div className="overflow-x-auto -mx-2">
          <table className="normativa-table">
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Content blocks
  return (
    <div className={`${config.className} p-4 mb-3`}>
      {(block.title || config.label) && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">{config.icon}</span>
          <h4 className="text-sm font-bold" style={{ color: config.titleColor }}>
            {block.title || config.label}
          </h4>
        </div>
      )}

      {block.text && (
        <p className="text-sm text-[#a1a1aa] leading-relaxed mb-2">
          {block.text}
        </p>
      )}

      {block.items && block.items.length > 0 && (
        <ul className="space-y-1.5 mt-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa] leading-relaxed">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: config.bulletColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
