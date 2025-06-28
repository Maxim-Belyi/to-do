export const Sounds = {
    audio: {},
    isPlaying: true,
    isPause: false,

    init() {
        this.audio.addTask = new Audio("../sounds/add-task.mp3");
        this.audio.addTask.volume = 0.3;

        this.audio.completedTask = new Audio("../sounds/completed-task.mp3");
        this.audio.completedTask.volume = 0.3;

        this.audio.deleteTask = new Audio("../sounds/delete-task.mp3");
        this.audio.deleteTask.volume = 0.3;
    },

    play(name) {
        this.audio[name].play();
    },

    pauseAll() {
        Object.values(this.audio).forEach((audio) => audio.pause());
    },

    resumeAll() {
        Object.values(this.audio).forEach((audio) => audio.play());
    },

    toggleMute() {
        if (this.isPlaying) {
            this.pauseAll();
            this.isPlaying = false;
            this.isMuted = true;
        } else if (this.isMuted) {
            this.resumeAll();
            this.isPlaying = true;
            this.isMuted = false;
        }
    },
};

Sounds.init();