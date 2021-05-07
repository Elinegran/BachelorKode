//Utviklet av: Gruppe 2
class IdleTimer {
    constructor({ timeout, onTimeout, onExpired }) {
         this.timeout = timeout;
         this.onTimeout = onTimeout;

        //Sjekker om expiredTime finnes i localStorage, hvis ikke = utløpt
        const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
        if (expiredTime > 0 && expiredTime < Date.now()) {
            onExpired();
            return;
        }

         this.eventHandler = this.updateExpiredTime.bind(this);
         this.tracker();
         this.startInterval();
    }

    //intervall for å spore hvert sekund
    //Henter expiredtime fra localStorage
    //Sjekker om nåværende tid over expiredTime, hvis tilfelle = timeout
    startInterval() {
        this.updateExpiredTime();

        this.interval = setInterval(() => {
           const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
           if(expiredTime < Date.now()) {
               if(this.onTimeout) {
                   this.onTimeout();
                   this.cleanUp();
               }
           } 
        }, 1000);
    }

    //Lager en tidssporing når bruker samhandler
    //Når bruker ikke samhandler innen 15min(900000ms), lagres expiredTime i localStorage
    updateExpiredTime() {
        if(this.timeoutTracker) {
            clearTimeout(this.timeoutTracker);
        }
        this.timeoutTracker = setTimeout(() => {
            localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
        }, 900000);
    }

    //Sjekker om det er aktivitet på datamus eller tastatur
    tracker() {
        window.addEventListener("mousemove", this.eventHandler);
        window.addEventListener("scroll", this.eventHandler);
        window.addEventListener("keydown", this.eventHandler);
    }

    //Stoppe interval, og stoppe sporingen av datamus og tastatur
    cleanUp() {
        localStorage.removeItem("_expiredTime");
        clearInterval(this.interval);
        window.removeEventListener("mousemove", this.eventHandler);
        window.removeEventListener("scroll", this.eventHandler);
        window.removeEventListener("keydown", this.eventHandler);
    }
}

export default IdleTimer;