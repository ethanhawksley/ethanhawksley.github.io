document.getElementById('email-clipboard').addEventListener('click', function () {
    navigator.clipboard.writeText('ethan@hawksley.dev');
});
document.getElementById('email-clipboard').addEventListener('mousedown', function () {
    const svg = document.getElementById('copy-svg');
    svg.style.fill = '#8f9398';
});
window.addEventListener('mouseup', function () {
    const svg = document.getElementById('copy-svg');
    svg.style.fill = '#5f6368';
});
