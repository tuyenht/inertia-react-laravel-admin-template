import React from 'react';

type Language = 'vi' | 'en' | 'ja' | 'zh';

interface LanguageSwitcherProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange }) => {
    const langs: Language[] = ['vi', 'en', 'ja', 'zh'];
    const languageNames: Record<Language, string> = {
        vi: 'Tiếng Việt',
        en: 'English',
        ja: '日本語',
        zh: '中文'
    };

    return (
        <div className="language-switcher-wrapper">
            <div className="language-switcher-container">
                {langs.map(l => (
                    <button
                        key={l}
                        onClick={() => onLanguageChange(l)}
                        className={`language-switcher-btn ${language === l ? 'active' : ''}`}
                    >
                        {l.toUpperCase()}
                        {/* Tooltip */}
                        <div className="language-switcher-tooltip">
                            <div className="language-switcher-tooltip-arrow"></div>
                            {languageNames[l]}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;

