/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("console.log(SecureStorage);\r\nSecureStorage.createAsync().then((storage) => {\r\n    console.log('value: ', storage.getItem('hello'), ': it is working if the value \"hello\" are shown on next refresh!');\r\n    storage.setItem('hello', 'world');\r\n    console.log('hello ', storage.getItem('hello'), ', refresh to see the value again.');\r\n    console.log(\r\n        SecureStorage.generateSecretKeyWithSalt('test', '6635a9d7aee160372bf7376cbbd3a207'),\r\n        'key test!',\r\n        '6635a9d7aee160372bf7376cbbd3a207',\r\n    );\r\n});\r\n\n\n//# sourceURL=webpack://@xzar90/secure-storage-demo/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;