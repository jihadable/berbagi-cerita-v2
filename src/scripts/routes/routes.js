import { token } from "../data/token"
import AddPage from "../pages/add/add-page"
import HomePage from "../pages/home/home-page"
import LoginPage from "../pages/login/login-page"
import NotFoundPage from "../pages/not-found/not-found-page"
import RegisterPage from "../pages/register/register-page"
import StoriesPage from "../pages/stories/stories-page"

const routes = {
    '/': () => new HomePage(),
    '/stories': () => {
        if (token.value){
            return new StoriesPage()
        } else {
            return new NotFoundPage()
        }
    },
    '/add': () => {
        if (token.value){
            return new AddPage()
        } else {
            return new NotFoundPage()
        }
    },
    '/register': () => {
        if (token.value){
            return new NotFoundPage()
        } else {
            return new RegisterPage()
        }
    },
    '/login': () => {
        if (token.value){
            return new NotFoundPage()
        } else {
            return new LoginPage()
        }
    },
}
   
export default routes