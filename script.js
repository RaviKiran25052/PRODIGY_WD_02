let timer;
let isRunning = false;
let startTime;
let pausedTime = 0;
let lapCount = 1; 

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateDisplay, 1000);
  }
}

function pause() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    pausedTime = Date.now() - startTime;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  pausedTime = 0;
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  lapCount = 1;
}

function lap() {
	if (isRunning) {
		if (lapCount <= 10) {
			const lapTime = calculateLapTime();
			const lapList = document.getElementById('laps');
			const lapItem = document.createElement('li');
			lapItem.innerText = `${lapCount}) ${lapTime}`; // Adding lap count
			lapList.appendChild(lapItem);
			lapCount++;
		} else {
			alert('Maximum lap limit reached (10 laps)!');
		}
	}
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateLapTime() {
  const currentTime = Date.now() - startTime;
  return formatTime(currentTime);
}
