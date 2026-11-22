const dialog = document.getElementById('demo-dialog');
const playLink = document.getElementById('play-demo');
const video = document.getElementById('demo-video');
const errorMessage = document.getElementById('video-error');

if (typeof dialog.showModal === 'function') {
  playLink.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dialog.showModal();
    video.play().catch((error) => {
      if (error.name === 'NotSupportedError') errorMessage.hidden = false;
    });
  });
  document.getElementById('close-demo').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    video.pause();
    playLink.focus({ preventScroll: true });
  });
  video.addEventListener('error', () => { errorMessage.hidden = false; });
  video.querySelector('source').addEventListener('error', () => { errorMessage.hidden = false; });
}
