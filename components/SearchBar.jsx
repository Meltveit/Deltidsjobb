'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NORWEGIAN_CITIES, JOB_SECTORS, JOB_TAGS } from '@/lib/constants';

export default function SearchBar({ onSearch }) {
    const t = useTranslations('Search');

    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [sector, setSector] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        onSearch({
            search: searchQuery,
            location: location || undefined,
            sector: sector || undefined,
            employmentType: employmentType || undefined,
            tags: selectedTags.length > 0 ? selectedTags : undefined,
        });
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="w-full">
            {/* Main search bar */}
            <div className="glass-card">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder={t('placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="input"
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="input"
                        >
                            <option value="">{t('allCities')}</option>
                            {NORWEGIAN_CITIES.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
                        {t('searchButton')}
                    </button>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary whitespace-nowrap"
                    >
                        {showFilters ? t('hideFilters') : t('showFilters')}
                    </button>
                </div>


                {/* Advanced filters */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        {/* Sector filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">{t('sectorLabel')}</label>
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="input"
                            >
                                <option value="">{t('allSectors')}</option>
                                {JOB_SECTORS.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Employment Type filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">{t('typeLabel')}</label>
                            <div className="flex flex-wrap gap-2">
                                {['Heltid', 'Deltid', 'Sesongarbeid', 'Vikariat'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setEmploymentType(employmentType === type ? '' : type)}
                                        className={`px-3 py-1 rounded-full text-sm transition-all ${employmentType === type
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                            : 'glass border border-white/20 text-slate-600 hover:border-primary-400'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">{t('tagsLabel')}</label>
                            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                                {JOB_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag)
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                            : 'glass border border-white/20 text-slate-600 hover:border-primary-400'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Active filters display */}
            {(searchQuery || location || sector || employmentType || selectedTags.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-slate-500">{t('activeFilters')}</span>

                    {searchQuery && (
                        <span className="tag">
                            {t('searchTag', { search: searchQuery })}
                            <button
                                onClick={() => setSearchQuery('')}
                                className="ml-2 hover:text-red-400"
                            >
                                ×
                            </button>
                        </span>
                    )}

                    {location && (
                        <span className="tag">
                            {location}
                            <button
                                onClick={() => setLocation('')}
                                className="ml-2 hover:text-red-400"
                            >
                                ×
                            </button>
                        </span>
                    )}

                    {sector && (
                        <span className="tag">
                            {sector}
                            <button
                                onClick={() => setSector('')}
                                className="ml-2 hover:text-red-400"
                            >
                                ×
                            </button>
                        </span>
                    )}

                    {employmentType && (
                        <span className="tag">
                            {employmentType}
                            <button
                                onClick={() => setEmploymentType('')}
                                className="ml-2 hover:text-red-400"
                            >
                                ×
                            </button>
                        </span>
                    )}

                    {selectedTags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                            <button
                                onClick={() => toggleTag(tag)}
                                className="ml-2 hover:text-red-400"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
