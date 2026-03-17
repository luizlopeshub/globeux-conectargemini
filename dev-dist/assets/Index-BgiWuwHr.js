const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminDashboard-RU4jZQYN.js","assets/jsx-runtime-DrpR9Qps.js","assets/index-B1HnjcBV.js","assets/preload-helper-t9NyTnoX.js","assets/dist-Ba8o5ZKm.js","assets/button-BhsDJ-bV.js","assets/utils-DeT4lGOf.js","assets/dist-DlFDchSU.js","assets/index-B7Jgp5x8.css","assets/clock-CWTWq6FL.js","assets/card-G1v-sgTB.js","assets/OperatorDashboard-Cjeu_ykx.js","assets/badge-BH_A9hA0.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { t as useAppStore } from "./index-B1HnjcBV.js";
//#region src/pages/Index.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AdminDashboard = (0, import_react.lazy)(() => __vitePreload(() => import("./AdminDashboard-RU4jZQYN.js").then((m) => ({ default: m.AdminDashboard })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])));
var OperatorDashboard = (0, import_react.lazy)(() => __vitePreload(() => import("./OperatorDashboard-Cjeu_ykx.js").then((m) => ({ default: m.OperatorDashboard })), __vite__mapDeps([11,1,2,3,4,5,6,7,8,9,12,10])));
function Index() {
	const { role } = useAppStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		"data-uid": "src/pages/Index.tsx:17:5",
		"data-prohibitions": "[editContent]",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Index.tsx:19:9",
			"data-prohibitions": "[]",
			className: "h-64 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Index.tsx:20:11",
				"data-prohibitions": "[]",
				className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"
			})
		}),
		children: role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {
			"data-uid": "src/pages/Index.tsx:24:27",
			"data-prohibitions": "[editContent]"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorDashboard, {
			"data-uid": "src/pages/Index.tsx:24:48",
			"data-prohibitions": "[editContent]"
		})
	});
}
//#endregion
export { Index as default };

//# sourceMappingURL=Index-BgiWuwHr.js.map