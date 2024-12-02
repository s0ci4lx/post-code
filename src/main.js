import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import highlight from './directives/highlight';
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.directive('highlight', highlight);
app.use(router)

app.mount('#app')
