const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/AdminDashboard-C_vlYyUh.js',
      'assets/jsx-runtime-DrpR9Qps.js',
      'assets/index-CybwkUNF.js',
      'assets/preload-helper-t9NyTnoX.js',
      'assets/dist-CRzU7Mw_.js',
      'assets/button-4pbr5ZBd.js',
      'assets/utils-BK5XrqCc.js',
      'assets/dist-CW6ASPE9.js',
      'assets/es2015-DisPectd.js',
      'assets/index-JT1H6z-3.css',
      'assets/clock-x2KT7CCk.js',
      'assets/card-D7ingX8J.js',
      'assets/OperatorDashboard-CjnDFGCP.js',
      'assets/badge-DkbvrWoT.js',
    ]),
) => i.map((i) => d[i])
import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import { t as __vitePreload } from './preload-helper-t9NyTnoX.js'
import { t as useAppStore } from './index-CybwkUNF.js'
//#region src/pages/Index.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var AdminDashboard = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./AdminDashboard-C_vlYyUh.js').then((m) => ({ default: m.AdminDashboard })),
    __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  ),
)
var OperatorDashboard = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./OperatorDashboard-CjnDFGCP.js').then((m) => ({ default: m.OperatorDashboard })),
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

//# sourceMappingURL=Index-DbbqZC0K.js.map
