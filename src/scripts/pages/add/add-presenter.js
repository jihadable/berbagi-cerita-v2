import { cameraStream } from "../../data/stream";
import { token } from "../../data/token";
import { Notif } from "../../notifs";

export default class AddPresenter {
    #model;
    #view;
   
    constructor({ model, view }) {
		this.#model = model;
		this.#view = view;
    }

	init(){
        const map = L.map('map').setView([-7.7956, 110.3695], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([-7.7956, 110.3695], { draggable: true }).addTo(map);

        function updateCoordinates(lat, lon) {
            document.getElementById('lat').value = lat.toFixed(6);
            document.getElementById('lon').value = lon.toFixed(6);
            marker.setLatLng([lat, lon]);
            marker.bindPopup(`Latitude: ${lat.toFixed(6)}<br>Longitude: ${lon.toFixed(6)}`).openPopup();
        }

        marker.on('dragend', function () {
            const pos = marker.getLatLng();
            updateCoordinates(pos.lat, pos.lng);
        });

        map.on('click', function (e) {
            const { lat, lng } = e.latlng;
            updateCoordinates(lat, lng);
        });

        updateCoordinates(marker.getLatLng().lat, marker.getLatLng().lng);

        async function startup() {
            const cameraVideo = document.getElementById('camera-video');
            const cameraCanvas = document.getElementById('camera-canvas');
            const takePhotoButton = document.getElementById('camera-take-button');
            const preview = document.getElementById('preview');

            async function getStream() {
                try {
                    cameraStream.stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    return cameraStream.stream;
                } catch (error) {
                    console.error(error);
                    alert('Error occurred: ' + error.message);
                }
            }

            function cameraLaunch(stream) {
                cameraVideo.srcObject = stream;
                cameraVideo.play();
            }

            takePhotoButton.addEventListener('click', function () {
                const context = cameraCanvas.getContext('2d');
                cameraCanvas.width = cameraVideo.videoWidth;
                cameraCanvas.height = cameraVideo.videoHeight;
                context.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
                
                cameraCanvas.toBlob(function (blob) {
                    if (blob.size > 1000000) { // Cek jika ukuran lebih dari 1MB
                        alert('Ukuran gambar terlalu besar. Silakan ambil foto lagi.');
                        return;
                    }
                    const url = URL.createObjectURL(blob);
                    preview.src = url;
                    preview.style.display = 'block';
                }, 'image/jpeg', 0.7);
            });

            const stream = await getStream();
            if (stream) cameraLaunch(stream);
        }
        
        startup();

        document.getElementById('storyForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const description = document.getElementById('description').value;
            const latitude = document.getElementById('lat').value;
            const longitude = document.getElementById('lon').value;
            const cameraCanvas = document.getElementById('camera-canvas');

            if (!cameraCanvas.toDataURL()) {
                alert("Silakan ambil foto terlebih dahulu!");
                return;
            }

            cameraCanvas.toBlob(function async(blob) {
                if (!blob) {
                    alert("Gagal mengambil gambar, coba lagi.");
                    return;
                }

                const photoFile = new File([blob], "photo.jpg", { type: "image/jpeg" })
                
                const formData = new FormData();
                formData.append('description', description);
                formData.append('lat', latitude);
                formData.append('lon', longitude);
                formData.append('photo', photoFile);

                fetch('https://story-api.dicoding.dev/v1/stories', {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + token.value
                    },
                    body: formData
                }).then(response => response.json())
                .then(data => {
                    alert('Cerita berhasil dikirim!');
                    document.getElementById('storyForm').reset();
                    document.getElementById('preview').style.display = 'none';
                }).catch(error => console.error('Error:', error));
            }, 'image/jpeg', 0.7);
        });
	}

    subNUbsub(){
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
}