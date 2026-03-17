import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import { t as Button } from './button-BhsDJ-bV.js'
import { r as createLucideIcon } from './utils-DeT4lGOf.js'
import { t as Clock } from './clock-CWTWq6FL.js'
import { d as Input, h as Link, t as useAppStore } from './index-B1HnjcBV.js'
import {
  a as CardHeader,
  i as CardFooter,
  n as CardContent,
  o as CardTitle,
  r as CardDescription,
  t as Card,
} from './card-G1v-sgTB.js'
import { t as Badge } from './badge-BH_A9hA0.js'
var CirclePlay = createLucideIcon('circle-play', [
  [
    'path',
    {
      d: 'M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z',
      key: 'kmsa83',
    },
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay',
    },
  ],
])
var Search = createLucideIcon('search', [
  [
    'path',
    {
      d: 'm21 21-4.34-4.34',
      key: '14j7rj',
    },
  ],
  [
    'circle',
    {
      cx: '11',
      cy: '11',
      r: '8',
      key: '4ej97u',
    },
  ],
])
//#endregion
//#region src/components/dashboard/OperatorDashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function OperatorDashboard() {
  const { templates, drafts } = useAppStore()
  const [search, setSearch] = (0, import_react.useState)('')
  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:26:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-6 animate-fade-in',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:27:7',
        'data-prohibitions': '[]',
        className: 'relative max-w-md',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
            'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:28:9',
            'data-prohibitions': '[editContent]',
            className: 'absolute left-3 top-3 h-4 w-4 text-muted-foreground',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
            'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:29:9',
            'data-prohibitions': '[editContent]',
            placeholder: 'Buscar checklist por nome...',
            className: 'pl-9 h-12 bg-white shadow-sm',
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:37:7',
        'data-prohibitions': '[editContent]',
        className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
        children: [
          filteredTemplates.map((template) => {
            const hasDraft = !!drafts[template.id]
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              Card,
              {
                'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:42:13',
                'data-prohibitions': '[editContent]',
                className: 'flex flex-col hover:shadow-elevation transition-shadow border-muted',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                    'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:46:15',
                    'data-prohibitions': '[editContent]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:47:17',
                        'data-prohibitions': '[editContent]',
                        className: 'flex justify-between items-start',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                            'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:48:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-lg leading-tight',
                            children: template.name,
                          }),
                          hasDraft &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                              'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:50:21',
                              'data-prohibitions': '[]',
                              variant: 'secondary',
                              className: 'bg-orange-100 text-orange-800',
                              children: 'Rascunho',
                            }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                        'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:55:17',
                        'data-prohibitions': '[editContent]',
                        className: 'line-clamp-2 mt-2',
                        children: template.description,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                    'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:59:15',
                    'data-prohibitions': '[]',
                    className: 'flex-1',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:60:17',
                      'data-prohibitions': '[]',
                      className: 'flex items-center text-sm text-muted-foreground gap-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                          'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:61:19',
                          'data-prohibitions': '[editContent]',
                          className: 'h-4 w-4',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:62:19',
                          'data-prohibitions': '[]',
                          children: 'Atualizado recentemente',
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
                    'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:65:15',
                    'data-prohibitions': '[editContent]',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:66:17',
                      'data-prohibitions': '[editContent]',
                      asChild: true,
                      className: 'w-full bg-[#f59e0b] hover:bg-[#d97706] text-white gap-2',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                        'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:67:19',
                        'data-prohibitions': '[editContent]',
                        to: `/execute/${template.id}`,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, {
                            'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:68:21',
                            'data-prohibitions': '[editContent]',
                            className: 'h-4 w-4',
                          }),
                          hasDraft ? 'Continuar Rascunho' : 'Iniciar Auditoria',
                        ],
                      }),
                    }),
                  }),
                ],
              },
              template.id,
            )
          }),
          filteredTemplates.length === 0 &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              'data-uid': 'src/components/dashboard/OperatorDashboard.tsx:77:11',
              'data-prohibitions': '[]',
              className: 'col-span-full py-12 text-center text-muted-foreground',
              children: 'Nenhum checklist encontrado.',
            }),
        ],
      }),
    ],
  })
}
//#endregion
export { OperatorDashboard }

//# sourceMappingURL=OperatorDashboard-Cjeu_ykx.js.map
