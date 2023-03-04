import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();
