import { initialize, renderMiddleware } from "./helpers/renderMiddleware.js";
import { page } from "./utils.js";


let mainSection = undefined; //query select the main section here
let navSection = undefined; //query select the nav section here

initialize(mainSection, navSection);

page(renderMiddleware);

//Set / and index.html redirects here

//Set pages routing here


page.start();