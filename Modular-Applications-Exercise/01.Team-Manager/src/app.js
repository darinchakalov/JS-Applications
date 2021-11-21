import page from '../node_modules/page/page.mjs'

import homePage from './pages/home/homePage.js'
import loginPage from './pages/login/loginPage.js'
import registerPage from './pages/register/registerPage.js'
import browseTeamsPage from './pages/browseTeams/browseTeamsPage.js'
import { renderMiddleware } from './renderMiddleware.js'
import authServices from './services/authServices.js'



page(renderMiddleware)

page('/', '/home')
page('/index.html', '/home')

page('/home', homePage.showView)
page('/login', loginPage.showView)
page('/register', registerPage.showView)
page('/browse-teams', browseTeamsPage.showView)
page('/logout', async (context) => {await authServices.logout(); page.redirect("/home")})


page.start()
