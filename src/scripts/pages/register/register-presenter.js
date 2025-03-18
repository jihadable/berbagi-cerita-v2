export default class RegisterPresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    init(){
        const register = async({ name, email, password }) => {
            try {
                await fetch("https://story-api.dicoding.dev/v1/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password })
                })

                alert("Registrasi berhasil")
                
                window.location.href = '/#/login';
            } catch(error){
                console.log(error)
                alert("register gagal")
            }
        }

        document.getElementById("register-form").addEventListener("submit", async(event) => {
            event.preventDefault()

            const name = document.getElementById("name-input").value
            const email = document.getElementById("email-input").value
            const password = document.getElementById("password-input").value

            await register({ name, email, password })
        })
    }
}