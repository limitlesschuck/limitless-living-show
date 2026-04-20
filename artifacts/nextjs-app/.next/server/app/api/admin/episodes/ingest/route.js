"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/episodes/ingest/route";
exports.ids = ["app/api/admin/episodes/ingest/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&page=%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Fnextjs-app&assetPrefix=%2Fnextjs-app&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&page=%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Fnextjs-app&assetPrefix=%2Fnextjs-app&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_runner_workspace_artifacts_nextjs_app_app_api_admin_episodes_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/episodes/ingest/route.ts */ \"(rsc)/./app/api/admin/episodes/ingest/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/episodes/ingest/route\",\n        pathname: \"/api/admin/episodes/ingest\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/episodes/ingest/route\"\n    },\n    resolvedPagePath: \"/home/runner/workspace/artifacts/nextjs-app/app/api/admin/episodes/ingest/route.ts\",\n    nextConfigOutput,\n    userland: _home_runner_workspace_artifacts_nextjs_app_app_api_admin_episodes_ingest_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/episodes/ingest/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTQuMi4zMF9yZWFjdC1kb21AMTguMy4xX3JlYWN0QDE4LjMuMV9fcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtYXBwLWxvYWRlci5qcz9uYW1lPWFwcCUyRmFwaSUyRmFkbWluJTJGZXBpc29kZXMlMkZpbmdlc3QlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGZXBpc29kZXMlMkZpbmdlc3QlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmVwaXNvZGVzJTJGaW5nZXN0JTJGcm91dGUudHMmYXBwRGlyPSUyRmhvbWUlMkZydW5uZXIlMkZ3b3Jrc3BhY2UlMkZhcnRpZmFjdHMlMkZuZXh0anMtYXBwJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJTJGYXJ0aWZhY3RzJTJGbmV4dGpzLWFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSUyRm5leHRqcy1hcHAmYXNzZXRQcmVmaXg9JTJGbmV4dGpzLWFwcCZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNrQztBQUMvRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2UvbmV4dGpzLWFwcC8/ODQ3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2FydGlmYWN0cy9uZXh0anMtYXBwL2FwcC9hcGkvYWRtaW4vZXBpc29kZXMvaW5nZXN0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9lcGlzb2Rlcy9pbmdlc3Qvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9lcGlzb2Rlcy9pbmdlc3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2VwaXNvZGVzL2luZ2VzdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3J1bm5lci93b3Jrc3BhY2UvYXJ0aWZhY3RzL25leHRqcy1hcHAvYXBwL2FwaS9hZG1pbi9lcGlzb2Rlcy9pbmdlc3Qvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FkbWluL2VwaXNvZGVzL2luZ2VzdC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&page=%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Fnextjs-app&assetPrefix=%2Fnextjs-app&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/episodes/ingest/route.ts":
/*!************************************************!*\
  !*** ./app/api/admin/episodes/ingest/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.14_next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _lib_captivate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/captivate */ \"(rsc)/./lib/captivate.ts\");\n\n\n\n\n\nasync function POST() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session || ![\n        \"super_admin\",\n        \"editor\"\n    ].includes(session.user.role)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const showId = process.env.CAPTIVATE_SHOW_ID;\n    if (!showId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"CAPTIVATE_SHOW_ID not set\"\n        }, {\n            status: 500\n        });\n    }\n    try {\n        const episodes = await (0,_lib_captivate__WEBPACK_IMPORTED_MODULE_4__.fetchCaptivateEpisodes)(showId);\n        let created = 0;\n        let skipped = 0;\n        for (const ep of episodes){\n            const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.episode.findUnique({\n                where: {\n                    captivateId: ep.id\n                }\n            });\n            if (existing) {\n                skipped++;\n                continue;\n            }\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.episode.create({\n                data: {\n                    captivateId: ep.id,\n                    titleOriginal: ep.title,\n                    descriptionOriginal: ep.shownotes ?? \"\",\n                    audioUrl: ep.media_url,\n                    thumbnailUrl: ep.episode_art ?? null,\n                    durationSeconds: ep.duration ?? null,\n                    captivatePublishedAt: ep.published_at ? new Date(ep.published_at) : null,\n                    publishStatus: \"draft\"\n                }\n            });\n            created++;\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            created,\n            skipped,\n            total: episodes.length\n        });\n    } catch (error) {\n        const message = error instanceof Error ? error.message : \"Unknown error\";\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2VwaXNvZGVzL2luZ2VzdC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTJDO0FBQ0U7QUFDSjtBQUNIO0FBQ21CO0FBRWxELGVBQWVLO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFFbEQsSUFBSSxDQUFDSSxXQUFXLENBQUM7UUFBQztRQUFlO0tBQVMsQ0FBQ0MsUUFBUSxDQUFDRCxRQUFRRSxJQUFJLENBQUNDLElBQUksR0FBRztRQUN0RSxPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtJQUVBLE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO0lBQzVDLElBQUksQ0FBQ0gsUUFBUTtRQUNYLE9BQU9iLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBNEIsR0FDckM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0lBRUEsSUFBSTtRQUNGLE1BQU1LLFdBQVcsTUFBTWIsc0VBQXNCQSxDQUFDUztRQUM5QyxJQUFJSyxVQUFVO1FBQ2QsSUFBSUMsVUFBVTtRQUVkLEtBQUssTUFBTUMsTUFBTUgsU0FBVTtZQUN6QixNQUFNSSxXQUFXLE1BQU1sQiwrQ0FBTUEsQ0FBQ21CLE9BQU8sQ0FBQ0MsVUFBVSxDQUFDO2dCQUMvQ0MsT0FBTztvQkFBRUMsYUFBYUwsR0FBR00sRUFBRTtnQkFBQztZQUM5QjtZQUVBLElBQUlMLFVBQVU7Z0JBQ1pGO2dCQUNBO1lBQ0Y7WUFFQSxNQUFNaEIsK0NBQU1BLENBQUNtQixPQUFPLENBQUNLLE1BQU0sQ0FBQztnQkFDMUJDLE1BQU07b0JBQ0pILGFBQWFMLEdBQUdNLEVBQUU7b0JBQ2xCRyxlQUFlVCxHQUFHVSxLQUFLO29CQUN2QkMscUJBQXFCWCxHQUFHWSxTQUFTLElBQUk7b0JBQ3JDQyxVQUFVYixHQUFHYyxTQUFTO29CQUN0QkMsY0FBY2YsR0FBR2dCLFdBQVcsSUFBSTtvQkFDaENDLGlCQUFpQmpCLEdBQUdrQixRQUFRLElBQUk7b0JBQ2hDQyxzQkFBc0JuQixHQUFHb0IsWUFBWSxHQUNqQyxJQUFJQyxLQUFLckIsR0FBR29CLFlBQVksSUFDeEI7b0JBQ0pFLGVBQWU7Z0JBQ2pCO1lBQ0Y7WUFDQXhCO1FBQ0Y7UUFFQSxPQUFPbEIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFUTtZQUFTQztZQUFTd0IsT0FBTzFCLFNBQVMyQixNQUFNO1FBQUM7SUFDdEUsRUFBRSxPQUFPakMsT0FBTztRQUNkLE1BQU1rQyxVQUFVbEMsaUJBQWlCbUMsUUFBUW5DLE1BQU1rQyxPQUFPLEdBQUc7UUFDekQsT0FBTzdDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBT2tDO1FBQVEsR0FBRztZQUFFakMsUUFBUTtRQUFJO0lBQzdEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ad29ya3NwYWNlL25leHRqcy1hcHAvLi9hcHAvYXBpL2FkbWluL2VwaXNvZGVzL2luZ2VzdC9yb3V0ZS50cz9mYzJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IGZldGNoQ2FwdGl2YXRlRXBpc29kZXMgfSBmcm9tIFwiQC9saWIvY2FwdGl2YXRlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG5cbiAgaWYgKCFzZXNzaW9uIHx8ICFbXCJzdXBlcl9hZG1pblwiLCBcImVkaXRvclwiXS5pbmNsdWRlcyhzZXNzaW9uLnVzZXIucm9sZSkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgY29uc3Qgc2hvd0lkID0gcHJvY2Vzcy5lbnYuQ0FQVElWQVRFX1NIT1dfSUQ7XG4gIGlmICghc2hvd0lkKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJDQVBUSVZBVEVfU0hPV19JRCBub3Qgc2V0XCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGVwaXNvZGVzID0gYXdhaXQgZmV0Y2hDYXB0aXZhdGVFcGlzb2RlcyhzaG93SWQpO1xuICAgIGxldCBjcmVhdGVkID0gMDtcbiAgICBsZXQgc2tpcHBlZCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGVwIG9mIGVwaXNvZGVzKSB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5lcGlzb2RlLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBjYXB0aXZhdGVJZDogZXAuaWQgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgc2tpcHBlZCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgcHJpc21hLmVwaXNvZGUuY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNhcHRpdmF0ZUlkOiBlcC5pZCxcbiAgICAgICAgICB0aXRsZU9yaWdpbmFsOiBlcC50aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbk9yaWdpbmFsOiBlcC5zaG93bm90ZXMgPz8gXCJcIixcbiAgICAgICAgICBhdWRpb1VybDogZXAubWVkaWFfdXJsLFxuICAgICAgICAgIHRodW1ibmFpbFVybDogZXAuZXBpc29kZV9hcnQgPz8gbnVsbCxcbiAgICAgICAgICBkdXJhdGlvblNlY29uZHM6IGVwLmR1cmF0aW9uID8/IG51bGwsXG4gICAgICAgICAgY2FwdGl2YXRlUHVibGlzaGVkQXQ6IGVwLnB1Ymxpc2hlZF9hdFxuICAgICAgICAgICAgPyBuZXcgRGF0ZShlcC5wdWJsaXNoZWRfYXQpXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgcHVibGlzaFN0YXR1czogXCJkcmFmdFwiLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjcmVhdGVkKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgY3JlYXRlZCwgc2tpcHBlZCwgdG90YWw6IGVwaXNvZGVzLmxlbmd0aCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIjtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogbWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiZmV0Y2hDYXB0aXZhdGVFcGlzb2RlcyIsIlBPU1QiLCJzZXNzaW9uIiwiaW5jbHVkZXMiLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInNob3dJZCIsInByb2Nlc3MiLCJlbnYiLCJDQVBUSVZBVEVfU0hPV19JRCIsImVwaXNvZGVzIiwiY3JlYXRlZCIsInNraXBwZWQiLCJlcCIsImV4aXN0aW5nIiwiZXBpc29kZSIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNhcHRpdmF0ZUlkIiwiaWQiLCJjcmVhdGUiLCJkYXRhIiwidGl0bGVPcmlnaW5hbCIsInRpdGxlIiwiZGVzY3JpcHRpb25PcmlnaW5hbCIsInNob3dub3RlcyIsImF1ZGlvVXJsIiwibWVkaWFfdXJsIiwidGh1bWJuYWlsVXJsIiwiZXBpc29kZV9hcnQiLCJkdXJhdGlvblNlY29uZHMiLCJkdXJhdGlvbiIsImNhcHRpdmF0ZVB1Ymxpc2hlZEF0IiwicHVibGlzaGVkX2F0IiwiRGF0ZSIsInB1Ymxpc2hTdGF0dXMiLCJ0b3RhbCIsImxlbmd0aCIsIm1lc3NhZ2UiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/episodes/ingest/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/../../node_modules/.pnpm/@auth+prisma-adapter@2.11.2_@prisma+client@5.22.0_prisma@5.22.0_/node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.14_next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/../../node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/admin/login\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const passwordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(credentials.password, user.password);\n                if (!passwordValid) {\n                    return null;\n                }\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.update({\n                    where: {\n                        id: user.id\n                    },\n                    data: {\n                        lastLoginAt: new Date()\n                    }\n                });\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.email = token.email ?? session.user.email;\n            }\n            return session;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.role = user.role ?? \"viewer\";\n            }\n            return token;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNxRDtBQUNhO0FBQ3BDO0FBQ1E7QUFFL0IsTUFBTUksY0FBK0I7SUFDMUNDLFNBQVNMLG1FQUFhQSxDQUFDRywrQ0FBTUE7SUFDN0JHLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFdBQVc7UUFDVFQsMkVBQW1CQSxDQUFDO1lBQ2xCVSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNZiwrQ0FBTUEsQ0FBQ2UsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNLLFFBQVEsQ0FBQ0EsS0FBS0YsUUFBUSxFQUFFO29CQUMzQixPQUFPO2dCQUNUO2dCQUVBLE1BQU1LLGdCQUFnQixNQUFNbkIsd0RBQWMsQ0FDeENVLFlBQVlJLFFBQVEsRUFDcEJFLEtBQUtGLFFBQVE7Z0JBR2YsSUFBSSxDQUFDSyxlQUFlO29CQUNsQixPQUFPO2dCQUNUO2dCQUVBLE1BQU1sQiwrQ0FBTUEsQ0FBQ2UsSUFBSSxDQUFDSyxNQUFNLENBQUM7b0JBQ3ZCSCxPQUFPO3dCQUFFSSxJQUFJTixLQUFLTSxFQUFFO29CQUFDO29CQUNyQkMsTUFBTTt3QkFBRUMsYUFBYSxJQUFJQztvQkFBTztnQkFDbEM7Z0JBRUEsT0FBTztvQkFDTEgsSUFBSU4sS0FBS00sRUFBRTtvQkFDWFgsT0FBT0ssS0FBS0wsS0FBSztvQkFDakJGLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZpQixNQUFNVixLQUFLVSxJQUFJO2dCQUNqQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTXZCLFNBQVEsRUFBRUEsT0FBTyxFQUFFd0IsS0FBSyxFQUFFO1lBQzlCLElBQUlBLFNBQVN4QixRQUFRWSxJQUFJLEVBQUU7Z0JBQ3pCWixRQUFRWSxJQUFJLENBQUNNLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtnQkFDMUJsQixRQUFRWSxJQUFJLENBQUNVLElBQUksR0FBR0UsTUFBTUYsSUFBSTtnQkFDOUJ0QixRQUFRWSxJQUFJLENBQUNMLEtBQUssR0FBR2lCLE1BQU1qQixLQUFLLElBQUlQLFFBQVFZLElBQUksQ0FBQ0wsS0FBSztZQUN4RDtZQUNBLE9BQU9QO1FBQ1Q7UUFDQSxNQUFNeUIsS0FBSSxFQUFFRCxLQUFLLEVBQUVaLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSWSxNQUFNTixFQUFFLEdBQUdOLEtBQUtNLEVBQUU7Z0JBQ2xCTSxNQUFNakIsS0FBSyxHQUFHSyxLQUFLTCxLQUFLO2dCQUN4QmlCLE1BQU1GLElBQUksR0FBRyxLQUE0QkEsSUFBSSxJQUFJO1lBQ25EO1lBQ0EsT0FBT0U7UUFDVDtJQUNGO0lBQ0FFLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHdvcmtzcGFjZS9uZXh0anMtYXBwLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBhdXRoL3ByaXNtYS1hZGFwdGVyXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSBhcyBOZXh0QXV0aE9wdGlvbnNbXCJhZGFwdGVyXCJdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9hZG1pbi9sb2dpblwiLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VyLmlkIH0sXG4gICAgICAgICAgZGF0YTogeyBsYXN0TG9naW5BdDogbmV3IERhdGUoKSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5lbWFpbCA9IHRva2VuLmVtYWlsID8/IHNlc3Npb24udXNlci5lbWFpbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgICB0b2tlbi5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIHRva2VuLnJvbGUgPSAodXNlciBhcyB7IHJvbGU/OiBzdHJpbmcgfSkucm9sZSA/PyBcInZpZXdlclwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFBZGFwdGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJwYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsInVwZGF0ZSIsImlkIiwiZGF0YSIsImxhc3RMb2dpbkF0IiwiRGF0ZSIsInJvbGUiLCJjYWxsYmFja3MiLCJ0b2tlbiIsImp3dCIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/captivate.ts":
/*!**************************!*\
  !*** ./lib/captivate.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchCaptivateEpisodes: () => (/* binding */ fetchCaptivateEpisodes)\n/* harmony export */ });\nconst CAPTIVATE_API_BASE = \"https://api.captivate.fm\";\nasync function getAccessToken() {\n    const username = process.env.CAPTIVATE_USERNAME;\n    const apiKey = process.env.CAPTIVATE_API_KEY;\n    if (!username || !apiKey) {\n        throw new Error(\"CAPTIVATE_USERNAME or CAPTIVATE_API_KEY not set\");\n    }\n    const res = await fetch(`${CAPTIVATE_API_BASE}/authenticate`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            username,\n            token: apiKey\n        })\n    });\n    if (!res.ok) {\n        throw new Error(`Captivate auth failed: ${res.status}`);\n    }\n    const data = await res.json();\n    return data.token.access_token;\n}\nasync function fetchCaptivateEpisodes(showId) {\n    const accessToken = await getAccessToken();\n    const res = await fetch(`${CAPTIVATE_API_BASE}/shows/${showId}/episodes`, {\n        headers: {\n            Authorization: `Bearer ${accessToken}`\n        }\n    });\n    if (!res.ok) {\n        throw new Error(`Captivate episodes fetch failed: ${res.status}`);\n    }\n    const data = await res.json();\n    return data.episodes ?? [];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2FwdGl2YXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxxQkFBcUI7QUF1QjNCLGVBQWVDO0lBQ2IsTUFBTUMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxrQkFBa0I7SUFDL0MsTUFBTUMsU0FBU0gsUUFBUUMsR0FBRyxDQUFDRyxpQkFBaUI7SUFFNUMsSUFBSSxDQUFDTCxZQUFZLENBQUNJLFFBQVE7UUFDeEIsTUFBTSxJQUFJRSxNQUFNO0lBQ2xCO0lBRUEsTUFBTUMsTUFBTSxNQUFNQyxNQUFNLENBQUMsRUFBRVYsbUJBQW1CLGFBQWEsQ0FBQyxFQUFFO1FBQzVEVyxRQUFRO1FBQ1JDLFNBQVM7WUFBRSxnQkFBZ0I7UUFBbUI7UUFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUFFYjtZQUFVYyxPQUFPVjtRQUFPO0lBQ2pEO0lBRUEsSUFBSSxDQUFDRyxJQUFJUSxFQUFFLEVBQUU7UUFDWCxNQUFNLElBQUlULE1BQU0sQ0FBQyx1QkFBdUIsRUFBRUMsSUFBSVMsTUFBTSxDQUFDLENBQUM7SUFDeEQ7SUFFQSxNQUFNQyxPQUFRLE1BQU1WLElBQUlXLElBQUk7SUFDNUIsT0FBT0QsS0FBS0gsS0FBSyxDQUFDSyxZQUFZO0FBQ2hDO0FBRU8sZUFBZUMsdUJBQ3BCQyxNQUFjO0lBRWQsTUFBTUMsY0FBYyxNQUFNdkI7SUFFMUIsTUFBTVEsTUFBTSxNQUFNQyxNQUFNLENBQUMsRUFBRVYsbUJBQW1CLE9BQU8sRUFBRXVCLE9BQU8sU0FBUyxDQUFDLEVBQUU7UUFDeEVYLFNBQVM7WUFBRWEsZUFBZSxDQUFDLE9BQU8sRUFBRUQsWUFBWSxDQUFDO1FBQUM7SUFDcEQ7SUFFQSxJQUFJLENBQUNmLElBQUlRLEVBQUUsRUFBRTtRQUNYLE1BQU0sSUFBSVQsTUFBTSxDQUFDLGlDQUFpQyxFQUFFQyxJQUFJUyxNQUFNLENBQUMsQ0FBQztJQUNsRTtJQUVBLE1BQU1DLE9BQVEsTUFBTVYsSUFBSVcsSUFBSTtJQUM1QixPQUFPRCxLQUFLTyxRQUFRLElBQUksRUFBRTtBQUM1QiIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2UvbmV4dGpzLWFwcC8uL2xpYi9jYXB0aXZhdGUudHM/OGZhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDQVBUSVZBVEVfQVBJX0JBU0UgPSBcImh0dHBzOi8vYXBpLmNhcHRpdmF0ZS5mbVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcHRpdmF0ZUVwaXNvZGUge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBzaG93bm90ZXM6IHN0cmluZztcbiAgZHVyYXRpb246IG51bWJlcjtcbiAgcHVibGlzaGVkX2F0OiBzdHJpbmc7XG4gIG1lZGlhX3VybDogc3RyaW5nO1xuICBlcGlzb2RlX2FydD86IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDYXB0aXZhdGVBdXRoUmVzcG9uc2Uge1xuICB0b2tlbjoge1xuICAgIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICB9O1xufVxuXG5pbnRlcmZhY2UgQ2FwdGl2YXRlRXBpc29kZXNSZXNwb25zZSB7XG4gIGVwaXNvZGVzOiBDYXB0aXZhdGVFcGlzb2RlW107XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHVzZXJuYW1lID0gcHJvY2Vzcy5lbnYuQ0FQVElWQVRFX1VTRVJOQU1FO1xuICBjb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5DQVBUSVZBVEVfQVBJX0tFWTtcblxuICBpZiAoIXVzZXJuYW1lIHx8ICFhcGlLZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDQVBUSVZBVEVfVVNFUk5BTUUgb3IgQ0FQVElWQVRFX0FQSV9LRVkgbm90IHNldFwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0NBUFRJVkFURV9BUElfQkFTRX0vYXV0aGVudGljYXRlYCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcm5hbWUsIHRva2VuOiBhcGlLZXkgfSksXG4gIH0pO1xuXG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYXB0aXZhdGUgYXV0aCBmYWlsZWQ6ICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgQ2FwdGl2YXRlQXV0aFJlc3BvbnNlO1xuICByZXR1cm4gZGF0YS50b2tlbi5hY2Nlc3NfdG9rZW47XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENhcHRpdmF0ZUVwaXNvZGVzKFxuICBzaG93SWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxDYXB0aXZhdGVFcGlzb2RlW10+IHtcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbigpO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0NBUFRJVkFURV9BUElfQkFTRX0vc2hvd3MvJHtzaG93SWR9L2VwaXNvZGVzYCwge1xuICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAgfSxcbiAgfSk7XG5cbiAgaWYgKCFyZXMub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhcHRpdmF0ZSBlcGlzb2RlcyBmZXRjaCBmYWlsZWQ6ICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgQ2FwdGl2YXRlRXBpc29kZXNSZXNwb25zZTtcbiAgcmV0dXJuIGRhdGEuZXBpc29kZXMgPz8gW107XG59XG4iXSwibmFtZXMiOlsiQ0FQVElWQVRFX0FQSV9CQVNFIiwiZ2V0QWNjZXNzVG9rZW4iLCJ1c2VybmFtZSIsInByb2Nlc3MiLCJlbnYiLCJDQVBUSVZBVEVfVVNFUk5BTUUiLCJhcGlLZXkiLCJDQVBUSVZBVEVfQVBJX0tFWSIsIkVycm9yIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b2tlbiIsIm9rIiwic3RhdHVzIiwiZGF0YSIsImpzb24iLCJhY2Nlc3NfdG9rZW4iLCJmZXRjaENhcHRpdmF0ZUVwaXNvZGVzIiwic2hvd0lkIiwiYWNjZXNzVG9rZW4iLCJBdXRob3JpemF0aW9uIiwiZXBpc29kZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/captivate.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUNFQyxLQUFzQyxHQUNsQztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQzFCLENBQVM7QUFDakIsR0FBRztBQUVMLElBQUlBLElBQXFDLEVBQUVKLGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2UvbmV4dGpzLWFwcC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/P1xuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiXG4gICAgICAgID8gW1wicXVlcnlcIiwgXCJlcnJvclwiLCBcIndhcm5cIl1cbiAgICAgICAgOiBbXCJlcnJvclwiXSxcbiAgfSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/next-auth@4.24.14_next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/@babel+runtime@7.28.6","vendor-chunks/jose@4.15.9","vendor-chunks/openid-client@5.7.1","vendor-chunks/bcryptjs@3.0.3","vendor-chunks/oauth@0.9.15","vendor-chunks/object-hash@2.2.0","vendor-chunks/preact@10.29.1","vendor-chunks/uuid@8.3.2","vendor-chunks/yallist@4.0.0","vendor-chunks/preact-render-to-string@5.2.6_preact@10.29.1","vendor-chunks/lru-cache@6.0.0","vendor-chunks/cookie@0.7.2","vendor-chunks/@auth+prisma-adapter@2.11.2_@prisma+client@5.22.0_prisma@5.22.0_","vendor-chunks/oidc-token-hash@5.2.0","vendor-chunks/@panva+hkdf@1.2.1"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@14.2.30_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&page=%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fepisodes%2Fingest%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Fnextjs-app&isDev=true&tsconfigPath=tsconfig.json&basePath=%2Fnextjs-app&assetPrefix=%2Fnextjs-app&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();