import { spawn } from 'child_process';

console.log('🚀 Starting Vite...');
const vite = spawn('vite', [], { stdio: 'inherit', shell: true });

// Đợi 3 giây để Vite khởi động xong
setTimeout(() => {
    console.log('🚀 Starting Laravel server on port 8082...');
    const laravel = spawn('php', ['artisan', 'serve', '--port=8082'], { stdio: 'inherit', shell: true });
    
    // Xử lý khi Laravel server thoát
    laravel.on('close', (code) => {
        console.log(`\nLaravel server exited with code ${code}`);
        vite.kill();
        process.exit(code);
    });
    
    // Lưu reference để kill khi cần
    process.laravelProcess = laravel;
}, 3000);

// Xử lý khi Vite thoát
vite.on('close', (code) => {
    console.log(`\nVite exited with code ${code}`);
    if (process.laravelProcess) {
        process.laravelProcess.kill();
    }
    process.exit(code);
});

// Xử lý Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n⏹️  Shutting down servers...');
    vite.kill();
    if (process.laravelProcess) {
        process.laravelProcess.kill();
    }
    process.exit(0);
});

