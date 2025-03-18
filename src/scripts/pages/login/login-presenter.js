import { token } from "../../data/token";

export default class LoginPresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    init(){
        const login = async({ email, password }) => {
            try {
                const response = await fetch("https://story-api.dicoding.dev/v1/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                })

                const { loginResult } = await response.json()

                localStorage.setItem("token", loginResult.token)
                token.value = loginResult.token

                alert("Login berhasil")

                window.location.href = '/#/stories';
            } catch(error){
                console.log(error)
                alert("login gagal")
            }
        }

        document.getElementById("login-form").addEventListener("submit", async(event) => {
            event.preventDefault()

            const email = document.getElementById("email-input").value
            const password = document.getElementById("password-input").value

            await login({ email, password })
        })
    }
}