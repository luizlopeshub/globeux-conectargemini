const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/AdminDashboard-BKrxB6z6.js',
      'assets/jsx-runtime-DrpR9Qps.js',
      'assets/index-DAJbD8tT.js',
      'assets/preload-helper-t9NyTnoX.js',
      'assets/dist-BxEJpsLU.js',
      'assets/button-4pbr5ZBd.js',
      'assets/utils-BK5XrqCc.js',
      'assets/dist-D7YLabLT.js',
      'assets/es2015-CJmGy-ee.js',
      'assets/index-BZCqvD-M.css',
      'assets/clock-3PvOLWxD.js',
      'assets/card-D2pAmwtD.js',
      'assets/OperatorDashboard-BYu_-LmY.js',
      'assets/badge-Dwby_ThR.js',
    ]),
) => i.map((i) => d[i])
import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import { t as __vitePreload } from './preload-helper-t9NyTnoX.js'
import { t as useAppStore } from './index-DAJbD8tT.js'
//#region src/pages/Index.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var AdminDashboard = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./AdminDashboard-BKrxB6z6.js').then((m) => ({ default: m.AdminDashboard })),
    __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  ),
)
var OperatorDashboard = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./OperatorDashboard-BYu_-LmY.js').then((m) => ({ default: m.OperatorDashboard })),
    __vite__mapDeps([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 11]),
  ),
)
function Index() {
  const { role } = useAppStore()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
    'data-uid': 'src/pages/Index.tsx:17:5',
    'data-prohibitions': '[editContent]',
    fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      'data-uid': 'src/pages/Index.tsx:19:9',
      'data-prohibitions': '[]',
      className: 'h-64 flex items-center justify-center',
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/pages/Index.tsx:20:11',
        'data-prohibitions': '[]',
        className: 'h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent',
      }),
    }),
    children:
      role === 'admin'
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {
            'data-uid': 'src/pages/Index.tsx:24:27',
            'data-prohibitions': '[editContent]',
          })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorDashboard, {
            'data-uid': 'src/pages/Index.tsx:24:48',
            'data-prohibitions': '[editContent]',
          }),
  })
}
//#endregion
export { Index as default }

//# sourceMappingURL=Index-CxZoamv0.js.map
