const SRC = "/audio/marcha-nupcial.mp3";
const VOLUME = 0.50;

let audio: HTMLAudioElement | null = null;
let fadeTimer = 0;

function track() {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.hidden = true;
    audio.dataset.invitationMusic = "true";
    document.body.appendChild(audio);
  }
  return audio;
}

function fadeTo(target: number) {
  window.clearInterval(fadeTimer);
  const current = track();
  fadeTimer = window.setInterval(() => {
    const next = current.volume + (target - current.volume) * 0.35;
    current.volume = Math.abs(target - next) < 0.02 ? target : next;
    if (current.volume === target) window.clearInterval(fadeTimer);
  }, 80);
}

export function preloadMusic() {
  track().load();
}

export function startAmbience() {
  const current = track();
  if (current.volume < 0.35) current.volume = 0.45;
  const pending = current.play();
  fadeTo(VOLUME);
  return pending;
}

export function setAmbienceMuted(muted: boolean) {
  const current = track();
  if (muted) {
    fadeTo(0);
    return Promise.resolve();
  }
  const pending = current.play();
  fadeTo(VOLUME);
  return pending;
}
