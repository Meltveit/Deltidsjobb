'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import StepWizard from '@/components/StepWizard';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { NORWEGIAN_CITIES, JOB_SECTORS, EMPLOYMENT_TYPES } from '@/lib/constants';

export default function PostJobPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [customTag, setCustomTag] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        sector: '',
        location: '',
        employmentType: '',
        email: session?.user?.email || '',
        phone: '',
        showPhone: false,
        logo: '',
        address: '',
        zip: '',
        country: '',
    });

    // Fetch available tags on mount
    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags');
            const data = await response.json();
            setAvailableTags(data.tags || []);
        } catch (error) {
            console.error('Error fetching tags:', error);
            // Fallback to empty array
            setAvailableTags([]);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('Bildet er for stort. Maks størrelse er 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const addCustomTag = () => {
        const tag = customTag.trim();

        if (!tag) return;

        if (formData.tags.length >= 6) {
            alert('Du kan maksimalt velge 6 tags');
            return;
        }

        if (formData.tags.includes(tag)) {
            alert('Denne taggen er allerede valgt');
            return;
        }

        // Add to selected tags
        setFormData({ ...formData, tags: [...formData.tags, tag] });

        // Add to available tags if not exists
        if (!availableTags.includes(tag)) {
            setAvailableTags([...availableTags, tag].sort());
        }

        // Clear input
        setCustomTag('');
    };

    // Redirect if not authenticated
    if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return null;
    }

    if (status === 'loading') {
        return (
            <div className="container-custom py-20">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async () => {
        try {
            // Create job
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Kunne ikke opprette stilling');
            }

            // Redirect to payment (localized)
            router.push(`/betaling/${data.jobId}`);
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleTag = (tag) => {
        if (formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
        } else if (formData.tags.length < 6) {
            setFormData({ ...formData, tags: [...formData.tags, tag] });
        }
    };

    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Legg ut en stilling</h1>
                    <p className="text-gray-400">
                        Fyll ut informasjonen nedenfor for å opprette en stillingsannonse
                    </p>
                </div>

                <div className="glass-card">
                    <StepWizard
                        currentStep={currentStep}
                        totalSteps={3}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                        isFirstStep={currentStep === 1}
                        isLastStep={currentStep === 3}
                    >
                        {/* Step 1: Title and Description */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Stillingstitel og beskrivelse</h2>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Stillingstitel <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        className="input"
                                        placeholder="F.eks: Kassemedarbeider til dagligvarebutikk"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Jobbeskrivelse <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        className="textarea"
                                        rows={8}
                                        placeholder="Beskriv stillingen, ansvarsområder, og hva dere ser etter i en kandidat..."
                                    />
                                    <p className="mt-2 text-sm text-gray-400">
                                        {formData.description.length} tegn
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Bedriftslogo (valgfritt)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="input p-2"
                                    />
                                    <p className="mt-2 text-sm text-gray-400">
                                        Last opp en logo (maks 2MB). Vil vises øverst i annonsen.
                                    </p>
                                    {formData.logo && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">Forhåndsvisning:</p>
                                            <img src={formData.logo} alt="Logo preview" className="h-16 object-contain" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Tags */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Velg tags</h2>
                                    <p className="text-gray-400 mb-6">
                                        Velg opptil 6 tags som beskriver stillingen ({formData.tags.length}/6)
                                    </p>
                                </div>

                                {/* Custom tag input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Legg til din egen tag
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={customTag}
                                            onChange={(e) => setCustomTag(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addCustomTag();
                                                }
                                            }}
                                            className="input flex-1"
                                            placeholder="F.eks: 'Nattevakt', 'Helgevakt'..."
                                            maxLength={30}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomTag}
                                            disabled={!customTag.trim() || formData.tags.length >= 6}
                                            className="btn-secondary whitespace-nowrap"
                                        >
                                            + Legg til
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Trykk Enter eller klikk "Legg til" for å legge til din egen tag
                                    </p>
                                </div>

                                {/* Selected tags */}
                                {formData.tags.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium mb-2">Valgte tags:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white flex items-center gap-2"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleTag(tag)}
                                                        className="hover:text-red-300"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Suggested tags */}
                                <div>
                                    <p className="text-sm font-medium mb-3">Foreslåtte tags:</p>
                                    <div className="flex flex-wrap gap-3 max-h-96 overflow-y-auto custom-scrollbar p-1">
                                        {availableTags.map((tag) => {
                                            const isSelected = formData.tags.includes(tag);
                                            const isDisabled = !isSelected && formData.tags.length >= 6;

                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => !isDisabled && toggleTag(tag)}
                                                    disabled={isDisabled}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white scale-105'
                                                        : isDisabled
                                                            ? 'glass border border-white/10 text-gray-500 cursor-not-allowed opacity-50'
                                                            : 'glass border border-white/20 text-gray-300 hover:border-primary-400 hover:scale-105'
                                                        }`}
                                                >
                                                    {tag}
                                                    {isSelected && (
                                                        <span className="ml-2 text-white">✓</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {formData.tags.length === 0 && (
                                    <p className="text-sm text-yellow-400 mt-4">
                                        Vennligst velg minst én tag eller legg til din egen
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Step 3: Location and Contact */}
                        {currentStep === 3 && (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Lokasjon og kontaktinformasjon</h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Sektor <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            value={formData.sector}
                                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                            required
                                            className="input"
                                        >
                                            <option value="">Velg sektor</option>
                                            {JOB_SECTORS.map((sector) => (
                                                <option key={sector} value={sector}>
                                                    {sector}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Adresse <span className="text-red-400">*</span>
                                        </label>
                                        <AddressAutocomplete
                                            onSelect={(data) => {
                                                setFormData({
                                                    ...formData,
                                                    address: data.address,
                                                    zip: data.zip,
                                                    location: data.city,
                                                    country: data.country
                                                });
                                            }}
                                            className="input"
                                        />
                                        <p className="text-xs text-gray-400 mt-2 mb-4">
                                            Begynn å skrive adressen, så fyller vi ut resten automatisk.
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Postnummer
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.zip}
                                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                                    className="input"
                                                    placeholder="0001"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    By / Sted <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    required
                                                    className="input"
                                                    placeholder="Oslo"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Ansettelsestype <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            value={formData.employmentType}
                                            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                                            required
                                            className="input"
                                        >
                                            <option value="">Velg ansettelsestype</option>
                                            {EMPLOYMENT_TYPES.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Kontakt e-post <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="input"
                                            placeholder="jobb@bedrift.no"
                                        />
                                        <p className="mt-2 text-sm text-gray-400">
                                            Denne e-postadressen vil vises på stillingsannonsen
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Telefonnummer
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input"
                                            placeholder="+47 123 45 678"
                                        />

                                        {formData.phone && (
                                            <div className="mt-3">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.showPhone}
                                                        onChange={(e) => setFormData({ ...formData, showPhone: e.target.checked })}
                                                        className="w-4 h-4 rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        Vis telefonnummer på stillingsannonsen
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="mt-8 p-6 glass border-2 border-primary-500/30 rounded-xl">
                                    <h3 className="text-lg font-semibold mb-4 text-primary-400">
                                        Forhåndsvisning
                                    </h3>
                                    <div className="space-y-3">
                                        {formData.logo && (
                                            <div className="mb-4">
                                                <img src={formData.logo} alt="Logo preview" className="h-16 object-contain" />
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-sm text-gray-400">Tittel:</span>
                                            <p className="font-semibold">{formData.title || '(Ingen tittel)'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Beskrivelse:</span>
                                            <p className="text-sm text-gray-300">
                                                {formData.description ? (
                                                    formData.description.length > 100
                                                        ? formData.description.substring(0, 100) + '...'
                                                        : formData.description
                                                ) : '(Ingen beskrivelse)'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Tags:</span>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.tags.map((tag) => (
                                                    <span key={tag} className="tag text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Lokasjon:</span>
                                            <p>{formData.location || '(Ingen lokasjon)'}, {formData.sector || '(Ingen sektor)'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Ansettelse:</span>
                                            <p>{formData.employmentType || '(Ikke valgt)'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Kontakt:</span>
                                            <p>{formData.email || '(Ingen e-post)'}</p>
                                            {formData.showPhone && formData.phone && (
                                                <p>{formData.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </StepWizard>
                </div>
            </div >
        </div >
    );
}
