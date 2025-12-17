'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import StepWizard from '@/components/StepWizard';
import { NORWEGIAN_CITIES, JOB_SECTORS, JOB_TAGS } from '@/lib/constants';

export default function EditJobPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        sector: '',
        location: '',
        email: '',
    });

    // Redirect if not authenticated
    if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return null;
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchJob();
        }
    }, [status]);

    const fetchJob = async () => {
        try {
            const response = await fetch(`/api/jobs/${params.jobId}`);
            const data = await response.json();

            if (!response.ok || !data.job) {
                throw new Error('Jobb ikke funnet');
            }

            // Pre-populate form with existing job data
            setFormData({
                title: data.job.title,
                description: data.job.description,
                tags: data.job.tags,
                sector: data.job.sector,
                location: data.job.location,
                email: data.job.email,
            });
        } catch (error) {
            alert(error.message);
            router.push('/dashboard');
        } finally {
            setLoading(false);
        }
    };

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
            const response = await fetch(`/api/jobs/${params.jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Kunne ikke oppdatere stilling');
            }

            alert('Stillingen ble oppdatert!');
            router.push('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Er du sikker på at du vil slette denne stillingen? Dette kan ikke angres.')) {
            return;
        }

        try {
            const response = await fetch(`/api/jobs/${params.jobId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Kunne ikke slette stilling');
            }

            router.push('/dashboard');
            router.refresh();
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

    if (status === 'loading' || loading) {
        return (
            <div className="container-custom py-20">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12 text-center relative">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Rediger stilling</h1>
                    <p className="text-gray-400">
                        Oppdater informasjonen om stillingen
                    </p>
                    <button
                        onClick={handleDelete}
                        className="absolute top-0 right-0 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Slett stilling
                    </button>
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
                        submitButtonText="Lagre endringer"
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

                                <div className="flex flex-wrap gap-3 max-h-96 overflow-y-auto custom-scrollbar p-1">
                                    {JOB_TAGS.map((tag) => {
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

                                {formData.tags.length === 0 && (
                                    <p className="text-sm text-yellow-400 mt-4">
                                        Vennligst velg minst én tag
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Step 3: Location and Contact */}
                        {currentStep === 3 && (
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
                                        By / Kommune <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        className="input"
                                    >
                                        <option value="">Velg by/kommune</option>
                                        {NORWEGIAN_CITIES.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
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

                                {/* Preview */}
                                <div className="mt-8 p-6 glass border-2 border-primary-500/30 rounded-xl">
                                    <h3 className="text-lg font-semibold mb-4 text-primary-400">
                                        Forhåndsvisning
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm text-gray-400">Titel:</span>
                                            <p className="font-semibold">{formData.title || '(Ingen titel)'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-400">Beskrivelse:</span>
                                            <p className="text-sm text-gray-300">
                                                {formData.description || '(Ingen beskrivelse)'}
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
                                            <span className="text-sm text-gray-400">Kontakt:</span>
                                            <p>{formData.email || '(Ingen e-post)'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </StepWizard>
                </div>
            </div>
        </div>
    );
}
