import React, { useState } from 'react';

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    isPassword?: boolean;
    showAtSymbol?: boolean;
    error?: string;
}

const LoginInput: React.FC<LoginInputProps> = ({ 
    label, 
    icon, 
    isPassword, 
    showAtSymbol, 
    error,
    ...props 
}) => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1">
                {label}
            </label>
            <div className="relative group">
                {/* Icon Left */}
                {icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            {icon}
                        </svg>
                    </div>
                )}
                <input 
                    {...props} 
                    type={isPassword ? (showPass ? 'text' : 'password') : props.type}
                    style={{
                        padding: '10.5px 38.5px',
                        height: '45.1px',
                        borderWidth: '0.8px',
                        lineHeight: '22.5px',
                        color: '#0f172a'
                    }}
                    className={`w-full ${icon ? 'pl-11' : 'pl-4'} ${isPassword || showAtSymbol ? 'pr-11' : 'pr-4'} bg-slate-50 border ${error ? 'border-red-300' : 'border-slate-200'} rounded-xl text-slate-900 text-[15px] font-medium placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all duration-200`}
                />
                {/* Right Actions */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {showAtSymbol && (
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 text-sm font-semibold select-none">
                            @
                        </div>
                    )}
                    {isPassword && (
                        <button 
                            type="button" 
                            onClick={() => setShowPass(!showPass)} 
                            style={{
                                width: '28px',
                                height: '28px',
                                padding: 0,
                                border: 'none',
                                outline: 'none',
                                background: 'transparent'
                            }}
                            className="flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                            {showPass ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '17.5px', height: '17.5px' }}>
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '17.5px', height: '17.5px' }}>
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>
            {error && (
                <div className="text-red-600 text-sm mt-1">{error}</div>
            )}
        </div>
    );
};

export default LoginInput;

