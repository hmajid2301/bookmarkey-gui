// <reference lib="WebWorker" />
/// <reference types="vite/client" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

// let allowlist: undefined | RegExp[];
// if (import.meta.env.DEV) allowlist = [/^\/$/];

// // to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL("/"), { allowlist }));
