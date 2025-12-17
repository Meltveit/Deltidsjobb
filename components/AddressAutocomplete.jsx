'use client';

import { useState, useEffect, useRef } from 'react';

export default function AddressAutocomplete({ onSelect, className }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = async (value) => {
        setQuery(value);
        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=5`,
                { headers: { 'Accept-Language': 'no,en' } }
            );
            const data = await response.json();
            setSuggestions(data);
            setIsOpen(true);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const handleSelect = (item) => {
        const address = item.address;
        const street = address.road || address.pedestrian || address.hamlet || address.suburb || '';
        const houseNumber = address.house_number || '';
        const fullStreet = street ? (houseNumber ? `${street} ${houseNumber}` : street) : item.display_name.split(',')[0];

        const city = address.city || address.town || address.village || address.municipality || '';
        const zip = address.postcode || '';
        const country = address.country || '';

        setQuery(fullStreet); // Show the street line in input
        setIsOpen(false);

        onSelect({
            address: fullStreet,
            city,
            zip,
            country,
            fullAddress: item.display_name
        });
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Start å skrive adressen (f.eks. Karl Johans gate 1)"
                className={className || "input"}
                autoComplete="off"
            />

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0"
                        >
                            <div className="font-medium text-slate-900">{item.display_name.split(',')[0]}</div>
                            <div className="text-xs text-slate-500 truncate">{item.display_name}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
