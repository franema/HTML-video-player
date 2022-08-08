const $player = document.querySelector(".player")
const $video = $player.querySelector(".viewer")
const $progress = $player.querySelector(".progress")
const $progressBar = $player.querySelector(".progress_filled")


const $playbutton = $player.querySelector(".play")
const $skipButtons = $player.querySelectorAll(`[data-skip]`)
const $volume = $player.querySelector(`[name="volume"]`)
const $playbackRate = $player.querySelector(`[name="playback_rate"]`)
const $fullscreenButton = $player.querySelector(`[name="fullscreen"]`)

function play(e) {
    $video.paused ? $video.play() : $video.pause()
}

function updatePlayButton(e) {
    if (this.paused) {
        $playbutton.textContent = "▶"
    } else {
        $playbutton.textContent = "❚❚"
    }
}

function skip() {
    $video.currentTime += Number(this.dataset.skip)
}

function handleVolumeUpdate(e) {
    $video.volume = this.value
}

function handlePlaybackUpdate() {
    $video.playbackRate = this.value
}

function handleProgress () {
    const percent = ($video.currentTime / $video.duration) * 100
    $progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
    const scrubTime = (e.offsetX / $progress.offsetWidth) * $video.duration
    $video.currentTime = scrubTime
}

function getFullscreen () {
    $video.requestFullscreen()
}

$playbutton.addEventListener("click", play)
$video.addEventListener("click", play)
$video.addEventListener("play", updatePlayButton)
$video.addEventListener("pause", updatePlayButton)
$video.addEventListener("timeupdate", handleProgress)
$skipButtons.forEach(function (button) {
    button.addEventListener("click", skip)
})
$volume.addEventListener("change", handleVolumeUpdate)
$playbackRate.addEventListener("change", handlePlaybackUpdate)
$volume.addEventListener("mousemove", handleVolumeUpdate)
$playbackRate.addEventListener("mousemove", handlePlaybackUpdate)

let mouseDown = false
$progress.addEventListener("mousedown", () => mouseDown = true)
$progress.addEventListener("mouseup", () => mouseDown = false)
$progress.addEventListener("click", scrub)
$progress.addEventListener("mousemove", function(e) {
    if(mouseDown) {
        scrub(e)
    }
})
$fullscreenButton.addEventListener("click", getFullscreen)