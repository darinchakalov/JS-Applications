import { page } from "./utils.js";

import { initializeNav, naviagationMiddleware } from "./renderers/navigationMiddleware.js";
import { initializeMain, renderMiddleware } from "./renderers/renderMiddleware.js";

let mainSection = document.getElementById(""); 
let navSection = document.getElementById("");

initializeMain(mainSection);
initializeNav(navSection);

page(renderMiddleware);
page(naviagationMiddleware);

//Set / and index.html redirects here


//Set pages routing here


page.start();
