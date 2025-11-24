'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  showSuggestions?: boolean;
}

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'area' | 'property' | 'blog';
  url: string;
}

export function SearchBar({
  placeholder = "Search properties, areas, blogs...",
  className = "",
  onSearch,
  showSuggestions = true
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sample suggestions - replace with real API calls
  const sampleSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      title: 'Properties in IMT Kharkhoda',
      type: 'area',
      url: '/deals/imt-kharkhoda'
    },
    {
      id: '2',
      title: 'Bahadurgarh Properties',
      type: 'area',
      url: '/deals/bahadurgarh'
    },
    {
      id: '3',
      title: 'Sonipat DDJAY Plots',
      type: 'area',
      url: '/deals/sonipat'
    },
    {
      id: '4',
      title: 'Real Estate Investment Tips',
      type: 'blog',
      url: '/blog/real-estate-investment-tips'
    },
    {
      id: '5',
      title: 'Property Market Trends 2024',
      type: 'blog',
      url: '/blog/property-market-trends-2024'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsOpen(false);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (value.length > 1 && showSuggestions) {
      setLoading(true);
      setIsOpen(true);

      // Simulate API call - replace with real search API
      setTimeout(() => {
        const filtered = sampleSuggestions.filter(s =>
          s.title.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setLoading(false);
      }, 300);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(suggestion.url);
    setQuery(suggestion.title);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'area': return '📍';
      case 'property': return '🏠';
      case 'blog': return '📝';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'area': return 'Area';
      case 'property': return 'Property';
      case 'blog': return 'Blog';
      default: return '';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
          <FaSearch className="ml-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 1 && setIsOpen(true)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          )}
          <button
            onClick={() => handleSearch()}
            className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {isOpen && showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">{getTypeIcon(suggestion.type)}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{suggestion.title}</div>
                      <div className="text-sm text-gray-500">{getTypeLabel(suggestion.type)}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="p-4 text-center text-gray-500">
                No results found. Try a different search term.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

// Compact version for header
export function CompactSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center">
      {isExpanded ? (
        <SearchBar
          className="w-64 transition-all duration-300"
          placeholder="Search..."
          onSearch={() => {
            // Handle search
            setIsExpanded(false);
          }}
        />
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
}