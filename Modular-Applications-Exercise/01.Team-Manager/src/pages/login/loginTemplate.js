import { html } from "../../../node_modules/lit-html/lit-html.js";
import {ifDefined} from '../../../node_modules/lit-html/directives/if-defined.js'

export let loginTemplate = (form, message) => html`
<section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${form.submitHandler} id="login-form" class="main-form pad-large">
                        <div class="error">${ifDefined(message)}${message}</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
`
