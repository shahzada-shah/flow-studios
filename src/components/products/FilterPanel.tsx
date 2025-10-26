import { X, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import type { ProductFilters } from '../../types/product'

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  activeFilterCount: number
}

interface FilterSection {
  id: keyof ProductFilters
  label: string
  options?: { value: string; label: string }[]
}

const filterSections: FilterSection[] = [
  { id: 'sortBy', label: 'Sort by' },
  { id: 'categories', label: 'Category' },
  { id: 'sizes', label: 'Size' },
  { id: 'colors', label: 'Color' },
  { id: 'activities', label: 'Activities' },
  { id: 'sustainable', label: 'Sustainability' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

const categoryOptions = [
  { value: 'leggings', label: 'Leggings' },
  { value: 'sports-bras', label: 'Sports Bras' },
  { value: 'tops', label: 'Tops' },
  { value: 'accessories', label: 'Accessories' },
]

const sizeOptions = [
  { value: 'XXS', label: 'XXS' },
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
]

const colorOptions = [
  { value: 'Black', label: 'Black' },
  { value: 'White', label: 'White' },
  { value: 'Grey', label: 'Grey' },
  { value: 'Navy', label: 'Navy' },
  { value: 'Olive', label: 'Olive' },
  { value: 'Terracotta', label: 'Terracotta' },
  { value: 'Sage', label: 'Sage' },
]

const activityOptions = [
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Pilates', label: 'Pilates' },
  { value: 'Barre', label: 'Barre' },
  { value: 'Running', label: 'Running' },
  { value: 'Training', label: 'Training' },
]

export const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, activeFilterCount }: FilterPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['sortBy']))

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const handleArrayFilterChange = (key: 'categories' | 'sizes' | 'colors' | 'activities', value: string) => {
    const currentValues = filters[key]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    onFiltersChange({ ...filters, [key]: newValues })
  }

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value as ProductFilters['sortBy'] })
  }

  const handleClearAll = () => {
    onFiltersChange({
      categories: [],
      sizes: [],
      colors: [],
      activities: [],
      priceRange: null,
      sustainable: false,
      newArrivals: false,
      sortBy: 'newest',
    })
  }

  const getOptionsForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'sortBy':
        return sortOptions
      case 'categories':
        return categoryOptions
      case 'sizes':
        return sizeOptions
      case 'colors':
        return colorOptions
      case 'activities':
        return activityOptions
      default:
        return []
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Filter Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-all duration-400 ease-in-out ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-normal tracking-wide">
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Filter Sections */}
          <div className={`flex-1 overflow-y-auto transition-all duration-300 delay-100 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {filterSections.map((section) => {
              const isExpanded = expandedSections.has(section.id)
              const options = getOptionsForSection(section.id)

              return (
                <div key={section.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="text-sm font-medium tracking-wide">{section.label}</span>
                    <div className="transition-transform duration-200">
                      {isExpanded ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 space-y-3 animate-fadeIn">
                      {section.id === 'sortBy' && (
                        <div className="space-y-2">
                          {sortOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="sortBy"
                                value={option.value}
                                checked={filters.sortBy === option.value}
                                onChange={(e) => handleSortChange(e.target.value)}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {section.id === 'categories' && (
                        <div className="space-y-2">
                          {categoryOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={filters.categories.includes(option.value)}
                                onChange={() => handleArrayFilterChange('categories', option.value)}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {section.id === 'sizes' && (
                        <div className="space-y-2">
                          {sizeOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={filters.sizes.includes(option.value)}
                                onChange={() => handleArrayFilterChange('sizes', option.value)}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {section.id === 'colors' && (
                        <div className="space-y-2">
                          {colorOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={filters.colors.includes(option.value)}
                                onChange={() => handleArrayFilterChange('colors', option.value)}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {section.id === 'activities' && (
                        <div className="space-y-2">
                          {activityOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={filters.activities.includes(option.value)}
                                onChange={() => handleArrayFilterChange('activities', option.value)}
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {section.id === 'sustainable' && (
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.sustainable}
                            onChange={(e) => onFiltersChange({ ...filters, sustainable: e.target.checked })}
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                            Show sustainable items only
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <button
              onClick={handleClearAll}
              className="w-full py-3 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-200"
            >
              CLEAR ALL
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-200"
            >
              VIEW RESULTS
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
