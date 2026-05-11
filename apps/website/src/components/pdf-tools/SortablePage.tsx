import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, RotateCw, Edit3, Download } from 'lucide-react';
import type { PdfPageInfo } from '../../lib/pdf';

interface SortablePageProps {
  page: PdfPageInfo;
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
  onDoubleClick: (id: string) => void;
  onExtract: (id: string) => void;
  onEdit: (id: string) => void;
  index: number;
}

export function SortablePage({ page, onRotate, onDelete, onDoubleClick, onEdit, onExtract, index }: SortablePageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`page-item ${isDragging ? 'dragging' : ''}`}
      onDoubleClick={() => onDoubleClick(page.id)}
      {...attributes}
      {...listeners}
    >
      <div className="page-thumbnail-container" style={{ position: 'relative' }}>
        <img 
          src={page.thumbnailUrl} 
          alt={`Page ${index + 1}`} 
          className="page-thumbnail"
          style={{ transform: `rotate(${page.rotation}deg)` }}
          draggable={false}
        />
        
        {/* Render Annotation Overlay Previews */}
        {page.annotations && page.annotations.map(anno => (
          <div
            key={anno.id}
            style={{
              position: 'absolute',
              top: `${(anno.pctY || 0) * 100}%`,
              left: `${(anno.pctX || 0) * 100}%`,
              width: `${(anno.pctW || 0) * 100}%`,
              height: `${(anno.pctH || 0) * 100}%`,
              border: '1px solid rgba(59, 130, 246, 0.8)',
              background: anno.type === 'signature' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.6)',
              transform: `rotate(${page.rotation}deg)`,
              pointerEvents: 'none',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {anno.type !== 'signature' && (
              <span style={{ fontSize: '6px', color: 'black', whiteSpace: 'nowrap' }}>{anno.content}</span>
            )}
            {anno.type === 'signature' && (
              <img src={anno.content} style={{ width: '100%', height: '100%', objectFit: 'contain' }} draggable={false} />
            )}
          </div>
        ))}
      </div>
      
      <div className="page-actions" onPointerDown={(e) => e.stopPropagation()}>
        <button 
          className="page-action-btn"
          onClick={(e) => { e.stopPropagation(); onEdit(page.id); }}
          title="Annotate Page"
        >
          <Edit3 size={16} />
        </button>
        <button 
          className="page-action-btn"
          onClick={(e) => { e.stopPropagation(); onExtract(page.id); }}
          title="Extract Page to PDF"
        >
          <Download size={16} />
        </button>
        <button 
          className="page-action-btn"
          onClick={(e) => { e.stopPropagation(); onRotate(page.id); }}
          title="Rotate Page"
        >
          <RotateCw size={16} />
        </button>
        <button 
          className="page-action-btn delete"
          onClick={(e) => { e.stopPropagation(); onDelete(page.id); }}
          title="Delete Page"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="page-number">{index + 1}</div>
    </div>
  );
}
