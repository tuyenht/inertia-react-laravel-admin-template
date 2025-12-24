import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import logoLight from "../../../images/logo-light.png";
import LoginInput from '../../Components/Auth/LoginInput';
import SocialButton from '../../Components/Auth/SocialButton';
import LanguageSwitcher from '../../Components/Auth/LanguageSwitcher';

type Language = 'vi' | 'en' | 'ja' | 'zh';

const translations: Record<Language, any> = {
    vi: {
        welcome: 'Đăng nhập Hệ thống',
        emailLabel: 'Tài khoản',
        passwordLabel: 'Mật khẩu',
        emailPlaceholder: 'ten-ban@gmail.com',
        passwordPlaceholder: '••••••••',
        forgotPassword: 'Quên mật khẩu?',
        signIn: 'Đăng nhập',
        signingIn: 'Đang đăng nhập...',
        orContinue: 'Đăng nhập nhanh',
        terms: 'Điều khoản',
        privacy: 'Bảo mật',
    },
    en: {
        welcome: 'System Login',
        emailLabel: 'Account',
        passwordLabel: 'Password',
        emailPlaceholder: 'your-name@gmail.com',
        passwordPlaceholder: '••••••••',
        forgotPassword: 'Forgot password?',
        signIn: 'Sign In',
        signingIn: 'Signing In...',
        orContinue: 'Quick Login',
        terms: 'Terms',
        privacy: 'Privacy',
    },
    ja: {
        welcome: 'システムログイン',
        emailLabel: 'アカウント',
        passwordLabel: 'パスワード',
        emailPlaceholder: 'your-name@gmail.com',
        passwordPlaceholder: '••••••••',
        forgotPassword: 'パスワードを忘れた？',
        signIn: 'ログイン',
        signingIn: 'ログイン中...',
        orContinue: 'クイックログイン',
        terms: '規約',
        privacy: 'プライバシー',
    },
    zh: {
        welcome: '系统登录',
        emailLabel: '账号',
        passwordLabel: '密码',
        emailPlaceholder: 'your-name@gmail.com',
        passwordPlaceholder: '••••••••',
        forgotPassword: '忘记密码？',
        signIn: '登录',
        signingIn: '登录中...',
        orContinue: '快捷登录',
        terms: '条款',
        privacy: '隐私',
    },
};

export default function Login({ status, canResetPassword }: any) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('app_lang');
        return (saved as Language) || 'vi';
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'admin@themesbrand.com' || '',
        password: '12345678' || '',
        remember: false,
    });

    useEffect(() => {
        localStorage.setItem('app_lang', language);
        document.documentElement.lang = language;
        return () => {
            reset('password');
        };
    }, [language]);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    const submit = (e: any) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleSocialLogin = (provider: string) => {
        alert(`Sign in with ${provider}`);
    };

    const t = translations[language];

    return (
        <React.Fragment>
            <Head title={`${t.welcome} | Velzon - React Admin & Dashboard Template`} />
            <div className="auth-baoson-wrapper">
                {/* Decorative Elements */}
                <div className="auth-baoson-decorative-1"></div>
                <div className="auth-baoson-decorative-2"></div>

                {/* Language Switcher */}
                <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />

                <main className="auth-baoson-main">
                    {/* Logo */}
                    <div className="auth-baoson-logo">
                        <Link href="/">
                            <img src={logoLight} alt="Logo" />
                        </Link>
                    </div>

                    {/* Login Form */}
                    <div className="glass w-full shadow-2xl relative transition-all duration-500 animate-fadeIn" style={{ maxWidth: '392px' }}>
                        {/* Header */}
                        <div style={{ marginBottom: '21px' }}>
                            <h2 className="text-left">
                                {t.welcome}
                            </h2>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-3 md:space-y-4">
                            <LoginInput
                                label={t.emailLabel}
                                placeholder={t.emailPlaceholder}
                                type="email"
                                value={data.email}
                                onChange={(e: any) => setData('email', e.target.value)}
                                required
                                showAtSymbol={true}
                                error={errors.email}
                                icon={
                                    <>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" cx="12" cy="7" r="4" />
                                    </>
                                }
                            />

                            <div>
                                <LoginInput
                                    label={t.passwordLabel}
                                    placeholder={t.passwordPlaceholder}
                                    isPassword
                                    value={data.password}
                                    onChange={(e: any) => setData('password', e.target.value)}
                                    required
                                    error={errors.password}
                                    icon={
                                        <>
                                            <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </>
                                    }
                                />
                                <div className="flex justify-between items-center mt-1.5 md:mt-2">
                                    <div className="h-4"></div>
                                    {canResetPassword && (
                                        <Link 
                                            href={route('password.request')} 
                                            style={{
                                                fontSize: '12.25px',
                                                fontWeight: 500,
                                                lineHeight: '17.5px',
                                                color: '#2563eb'
                                            }}
                                            className="hover:text-blue-700 hover:underline transition-colors"
                                        >
                                            {t.forgotPassword}
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Error Message Display */}
                            {(errors.email || errors.password) && !errors.email && !errors.password && (
                                <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-100 flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Thông tin tài khoản hoặc mật khẩu không chính xác.
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={processing}
                                style={{
                                    padding: '12.25px 0',
                                    height: '47px',
                                    lineHeight: '22.5px',
                                    marginTop: '14px',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    letterSpacing: 'normal',
                                    border: 'none',
                                    outline: 'none'
                                }}
                                className={`w-full rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all duration-200 ${
                                    processing 
                                        ? 'bg-blue-700 text-white/90 cursor-wait scale-[0.98] shadow-inner' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5'
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>{t.signingIn}</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22.5px' }}>{t.signIn}</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative" style={{ marginTop: '21px', marginBottom: '21px' }}>
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-xs font-medium text-slate-400">
                                    {t.orContinue}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3" style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ flex: '1 1 0%' }}>
                                <SocialButton type="google" onClick={() => handleSocialLogin('Google')} />
                            </div>
                            <div style={{ flex: '1 1 0%' }}>
                                <SocialButton type="facebook" onClick={() => handleSocialLogin('Facebook')} />
                            </div>
                        </div>

                        {/* Footer links */}
                        <div className="flex justify-center" style={{ marginTop: '21px', gap: '21px' }}>
                            <button 
                                type="button" 
                                style={{
                                    fontSize: '10.5px',
                                    fontWeight: 500,
                                    lineHeight: '14px',
                                    color: '#94a3b8',
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                    textTransform: 'none',
                                    letterSpacing: 'normal',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {t.terms}
                            </button>
                            <button 
                                type="button" 
                                style={{
                                    fontSize: '10.5px',
                                    fontWeight: 500,
                                    lineHeight: '14px',
                                    color: '#94a3b8',
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                    textTransform: 'none',
                                    letterSpacing: 'normal',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {t.privacy}
                            </button>
                        </div>
                    </div>

                    <footer className="auth-baoson-footer">
                        <p>
                            &copy; {new Date().getFullYear()} <Link href="https://baoson.net" target="_blank" rel="noopener noreferrer">BaoSon Ads</Link>. All rights reserved.
                        </p>
                    </footer>
                </main>
            </div>
        </React.Fragment>
    );
}

