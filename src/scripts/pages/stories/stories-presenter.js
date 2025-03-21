import { cameraStream } from "../../data/stream";
import { token } from "../../data/token";
import { Notif } from "../../notifs";

export default class StoriesPresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }
 
    async showStories() {
        console.log(this.#model)
        const storyElement = ({ id, description, name, photoUrl }) => {
            return `
            <div class="story">
                <div class="img">
                    <img src="${URL.createObjectURL(photoUrl)}" alt="Story dari ${name}" />
                </div>
                <div class="text">
                    <div class="story-id">${id}</div>
                    <div class="story-name">${name}</div>
                    <div class="story-desc">${description}</div>
                </div>
                <div id="map-${id}" class="story-map" style="height: 200px;"></div>
            </div>
            `
        }

        const createMap = (id, lat, lon) => {
            const map = L.map(`map-${id}`).setView([lat, lon], 13)
        
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)
        
            L.marker([lat, lon]).addTo(map).bindPopup(`📍 ${lat}, ${lon}`).openPopup()
        }

        const storiesElement = document.querySelector(".stories")
        storiesElement.innerHTML = ""
        
        this.#model.forEach(story => {
            storiesElement.innerHTML += storyElement(story)
        })

        this.#model.forEach(story => {
            createMap(story.id, story.lat, story.lon)
        })
    }

    subNUnsub(){
        document.querySelector('.sub').addEventListener('click', Notif.subscribe);
        document.querySelector('.unsub').addEventListener('click', Notif.unsubscribe);
    }

    logoutMethod(){
        if (document.querySelector(".logout-btn")){
            document.querySelector(".logout-btn").addEventListener("click", () => {
                localStorage.removeItem("token")
                token.value = null
    
                window.location.href = '/#/'
            })
        }
    }

    skipToContent(){
        const skipButton = document.querySelector('.skip-to-content');
        skipButton.addEventListener('click', () => {
            const storiesSection = document.getElementById('main-content');
            storiesSection?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    stopAllStreams() {
        if (cameraStream.stream) {
            cameraStream.stream.getTracks().forEach((track) => track.stop());
            cameraStream.stream = null;
        }
    }
}