'use client';

export default function StepWizard({ currentStep, totalSteps, children, onNext, onBack, onSubmit, isLastStep, isFirstStep, submitButtonText = 'Gå til betaling →' }) {
    return (
        <div className="w-full">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                        Steg {currentStep} av {totalSteps}
                    </span>
                    <span className="text-sm text-gray-400">
                        {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center mb-8">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${index + 1 < currentStep
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : index + 1 === currentStep
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white animate-pulse'
                                    : 'glass border border-white/20 text-gray-400'
                                }`}
                        >
                            {index + 1}
                        </div>
                        {index < totalSteps - 1 && (
                            <div
                                className={`w-12 h-1 mx-2 ${index + 1 < currentStep
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                                    : 'bg-white/10'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="mb-8">{children}</div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    disabled={isFirstStep}
                    className="btn-secondary disabled:opacity-30"
                >
                    ← Tilbake
                </button>

                {isLastStep ? (
                    <button onClick={onSubmit} className="btn-primary">
                        {submitButtonText}
                    </button>
                ) : (
                    <button onClick={onNext} className="btn-primary">
                        Neste →
                    </button>
                )}
            </div>
        </div>
    );
}
