import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ tasks, selected, onChange }) {
  const categories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean)));

  return (
    <div className="category-filter">
      <label>📁 Filtrar por categoría: </label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todas</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
