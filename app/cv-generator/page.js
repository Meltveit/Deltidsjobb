'use client';

import { useState, useRef } from 'react';

export default function CVGeneratorPage() {
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
    });

    const [experiences, setExperiences] = useState([
        { id: 1, title: '', company: '', startDate: '', endDate: '', description: '', current: false }
    ]);

    const [education, setEducation] = useState([
        { id: 1, school: '', degree: '', startDate: '', endDate: '', description: '' }
    ]);

    const [isGenerating, setIsGenerating] = useState(false);

    // Handlers
    const handleInfoChange = (e) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '', current: false
        }]);
    };

    const updateExperience = (id, field, value) => {
        setExperiences(experiences.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const removeExperience = (id) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
    };

    const addEducation = () => {
        setEducation([...education, {
            id: Date.now(), school: '', degree: '', startDate: '', endDate: '', description: ''
        }]);
    };

    const updateEducation = (id, field, value) => {
        setEducation(education.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const removeEducation = (id) => {
        setEducation(education.filter(edu => edu.id !== id));
    };

    const handlePrint = () => {
        setIsGenerating(true);
        setTimeout(() => {
            window.print();
            setIsGenerating(false);
        }, 100);
    };

    return (
        <div className="container-custom py-12">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">

                {/* Editor Section (Hidden when printing) */}
                <div className={`w-full md:w-1/2 space-y-8 print:hidden ${isGenerating ? 'hidden' : 'block'}`}>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-4">CV Generator</h1>
                        <p className="text-gray-400">
                            Fyll inn informasjonen din for å generere en profesjonell CV.
                            Ingen data lagres på våre servere.
                        </p>
                    </div>

                    {/* Personal Info */}
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Personlig informasjon</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Fullt navn</label>
                                <input name="name" value={personalInfo.name} onChange={handleInfoChange} className="input" placeholder="Ola Nordmann" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">E-post</label>
                                    <input name="email" value={personalInfo.email} onChange={handleInfoChange} className="input" placeholder="ola@eksempel.no" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Telefon</label>
                                    <input name="phone" value={personalInfo.phone} onChange={handleInfoChange} className="input" placeholder="123 45 678" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Adresse</label>
                                <input name="address" value={personalInfo.address} onChange={handleInfoChange} className="input" placeholder="Storgata 1, 0123 Oslo" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kort om deg</label>
                                <textarea name="summary" value={personalInfo.summary} onChange={handleInfoChange} className="input min-h-[100px]" placeholder="En kort tekst om hvem du er..." />
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="glass-card">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Arbeidserfaring</h2>
                            <button onClick={addExperience} className="btn-secondary text-sm py-1 px-3">+ Legg til</button>
                        </div>
                        <div className="space-y-6">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="p-4 border border-white/10 rounded-lg bg-white/5 relative">
                                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">✕</button>
                                    <div className="space-y-3">
                                        <input
                                            placeholder="Stillingstittel"
                                            value={exp.title}
                                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                            className="input"
                                        />
                                        <input
                                            placeholder="Bedrift"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                            className="input"
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="month"
                                                value={exp.startDate}
                                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                className="input"
                                            />
                                            <span className="self-center text-gray-400">-</span>
                                            <input
                                                type="month"
                                                value={exp.endDate}
                                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                className="input"
                                            />
                                        </div>
                                        <textarea
                                            placeholder="Beskrivelse av arbeidsoppgaver..."
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                            className="input min-h-[80px]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="glass-card">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Utdanning</h2>
                            <button onClick={addEducation} className="btn-secondary text-sm py-1 px-3">+ Legg til</button>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="p-4 border border-white/10 rounded-lg bg-white/5 relative">
                                    <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-300">✕</button>
                                    <div className="space-y-3">
                                        <input
                                            placeholder="Skole / Universitet"
                                            value={edu.school}
                                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                            className="input"
                                        />
                                        <input
                                            placeholder="Grad / Linje"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                            className="input"
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="month"
                                                value={edu.startDate}
                                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                                className="input"
                                            />
                                            <span className="self-center text-gray-400">-</span>
                                            <input
                                                type="month"
                                                value={edu.endDate}
                                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                                className="input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview / Print Section */}
                <div className={`w-full ${isGenerating ? 'w-full' : 'md:w-1/2'} sticky top-8`}>
                    <div className="mb-4 flex justify-between items-center print:hidden">
                        <h2 className="text-xl font-bold">Forhåndsvisning</h2>
                        <button onClick={handlePrint} className="btn-primary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Last ned PDF / Skriv ut
                        </button>
                    </div>

                    {/* A4 Paper Preview */}
                    <div className="bg-white text-black p-[2cm] shadow-2xl min-h-[29.7cm] w-full max-w-[21cm] mx-auto print:shadow-none print:w-full print:max-w-none print:p-0">
                        {/* Header */}
                        <div className="border-b-2 border-slate-800 pb-6 mb-8">
                            <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-wider mb-2">
                                {personalInfo.name || 'Ditt Navn'}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                {personalInfo.email && (
                                    <span className="flex items-center gap-1">
                                        📧 {personalInfo.email}
                                    </span>
                                )}
                                {personalInfo.phone && (
                                    <span className="flex items-center gap-1">
                                        📱 {personalInfo.phone}
                                    </span>
                                )}
                                {personalInfo.address && (
                                    <span className="flex items-center gap-1">
                                        📍 {personalInfo.address}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                        {personalInfo.summary && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 mb-3 pb-1">
                                    Profil
                                </h3>
                                <p className="text-slate-700 leading-relaxed">
                                    {personalInfo.summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {experiences.length > 0 && experiences[0].title && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 mb-4 pb-1">
                                    Arbeidserfaring
                                </h3>
                                <div className="space-y-5">
                                    {experiences
                                        .sort((a, b) => (new Date(a.startDate) - new Date(b.startDate))) // Eldst først som bedt om
                                        .map((exp) => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="font-bold text-slate-900">{exp.title}</h4>
                                                    <span className="text-sm text-slate-500 font-medium">
                                                        {exp.startDate} – {exp.endDate || 'Nå'}
                                                    </span>
                                                </div>
                                                <div className="text-slate-700 font-medium mb-1">{exp.company}</div>
                                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {education.length > 0 && education[0].school && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 mb-4 pb-1">
                                    Utdanning
                                </h3>
                                <div className="space-y-5">
                                    {education
                                        .sort((a, b) => (new Date(a.startDate) - new Date(b.startDate))) // Eldst først
                                        .map((edu) => (
                                            <div key={edu.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="font-bold text-slate-900">{edu.school}</h4>
                                                    <span className="text-sm text-slate-500 font-medium">
                                                        {edu.startDate} – {edu.endDate || 'Nå'}
                                                    </span>
                                                </div>
                                                <div className="text-slate-700">{edu.degree}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Powered by footer for print */}
                        <div className="hidden print:block mt-20 pt-8 text-center text-xs text-slate-400 border-t border-slate-100">
                            CV opprettet med Deltidsjobb.no
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .container-custom, .container-custom * {
                        visibility: visible;
                    }
                    .container-custom {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    @page {
                        margin: 0;
                        size: auto;
                    }
                    body {
                        background: white;
                    }
                }
            `}</style>
        </div>
    );
}
