/**
 * Thay đổi attribute trên <html> và đồng thời lưu vào localStorage
 * để Theme Customizer được giữ lại sau khi F5.
 */
const changeHTMLAttribute = (attribute: string, value: string): boolean => {
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute(attribute, value);
    }

    // Lưu vào localStorage để dùng lại khi reload
    try {
        if (typeof window !== 'undefined' && 'localStorage' in window) {
            const key = 'theme-settings';
            const raw = window.localStorage.getItem(key);
            const settings: Record<string, string> = raw ? JSON.parse(raw) : {};
            settings[attribute] = value;
            window.localStorage.setItem(key, JSON.stringify(settings));
        }
    } catch {
        // Bỏ qua lỗi localStorage (ví dụ: quota, chế độ private)
    }

    return true;
};

export { changeHTMLAttribute };