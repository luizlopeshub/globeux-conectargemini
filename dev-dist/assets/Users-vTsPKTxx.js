import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import { m as toast } from './dist-BxEJpsLU.js'
import { t as Button } from './button-4pbr5ZBd.js'
import './es2015-CJmGy-ee.js'
import { n as generateId, r as createLucideIcon } from './utils-BK5XrqCc.js'
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  o as ShieldAlert,
  r as SelectItem,
  s as Plus,
  t as Select,
} from './select-D_RAklpV.js'
import {
  g as Input,
  i as AvatarImage,
  n as Avatar,
  r as AvatarFallback,
  t as useAppStore,
} from './index-DAJbD8tT.js'
import { t as Badge } from './badge-Dwby_ThR.js'
import {
  a as DialogTitle,
  c as TableCell,
  d as TableRow,
  i as DialogHeader,
  l as TableHead,
  n as DialogContent,
  o as Table,
  r as DialogFooter,
  s as TableBody,
  t as Dialog,
  u as TableHeader,
} from './dialog-umsNqHVs.js'
import { n as Label } from './dist-CSKhcd_F.js'
var Pencil = createLucideIcon('pencil', [
  [
    'path',
    {
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
      key: '1a8usu',
    },
  ],
  [
    'path',
    {
      d: 'm15 5 4 4',
      key: '1mk7zo',
    },
  ],
])
//#endregion
//#region src/pages/Users.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var DEPARTMENTS = ['Nenhum', 'Recebimento', 'Expedição', 'Químicos', 'Qualidade']
function Users() {
  const { users, setUsers, currentUser } = useAppStore()
  const [editingUser, setEditingUser] = (0, import_react.useState)(null)
  if (currentUser?.role !== 'admin')
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      'data-uid': 'src/pages/Users.tsx:43:7',
      'data-prohibitions': '[]',
      className: 'p-8 text-center text-muted-foreground flex flex-col items-center gap-4',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
          'data-uid': 'src/pages/Users.tsx:44:9',
          'data-prohibitions': '[editContent]',
          className: 'h-12 w-12 text-destructive',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          'data-uid': 'src/pages/Users.tsx:45:9',
          'data-prohibitions': '[]',
          children: 'Acesso negado. Apenas administradores podem gerenciar usuários.',
        }),
      ],
    })
  const handleSave = () => {
    if (!editingUser?.name || !editingUser?.email)
      return toast({
        title: 'Preencha os campos obrigatórios',
        variant: 'destructive',
      })
    const dept = editingUser.department === 'Nenhum' ? void 0 : editingUser.department
    if (editingUser.id) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...editingUser,
                department: dept,
              }
            : u,
        ),
      )
      toast({ title: 'Usuário atualizado com sucesso' })
    } else {
      setUsers([
        ...users,
        {
          ...editingUser,
          id: `u_${generateId()}`,
          role: editingUser.role || 'operator',
          department: dept,
          avatar: `https://img.usecurling.com/ppl/thumbnail?seed=${generateId()}`,
        },
      ])
      toast({ title: 'Usuário criado com sucesso' })
    }
    setEditingUser(null)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Users.tsx:80:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-6',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Users.tsx:81:7',
        'data-prohibitions': '[]',
        className: 'flex justify-between items-center',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/Users.tsx:82:9',
            'data-prohibitions': '[]',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
                'data-uid': 'src/pages/Users.tsx:83:11',
                'data-prohibitions': '[]',
                className: 'text-2xl font-bold',
                children: 'Gerenciamento de Usuários',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                'data-uid': 'src/pages/Users.tsx:84:11',
                'data-prohibitions': '[]',
                className: 'text-muted-foreground',
                children: 'Controle de acesso (RBAC) e departamentos.',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            'data-uid': 'src/pages/Users.tsx:86:9',
            'data-prohibitions': '[]',
            onClick: () =>
              setEditingUser({
                role: 'operator',
                department: 'Nenhum',
              }),
            className: 'gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                'data-uid': 'src/pages/Users.tsx:90:11',
                'data-prohibitions': '[editContent]',
                className: 'h-4 w-4',
              }),
              ' Novo Usuário',
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/pages/Users.tsx:94:7',
        'data-prohibitions': '[editContent]',
        className: 'border rounded-lg bg-card overflow-hidden shadow-sm',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
          'data-uid': 'src/pages/Users.tsx:95:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
              'data-uid': 'src/pages/Users.tsx:96:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                'data-uid': 'src/pages/Users.tsx:97:13',
                'data-prohibitions': '[]',
                className: 'bg-muted/50',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/Users.tsx:98:15',
                    'data-prohibitions': '[]',
                    children: 'Usuário',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/Users.tsx:99:15',
                    'data-prohibitions': '[]',
                    children: 'Email',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/Users.tsx:100:15',
                    'data-prohibitions': '[]',
                    children: 'Nível de Acesso',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/Users.tsx:101:15',
                    'data-prohibitions': '[]',
                    children: 'Departamento',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/Users.tsx:102:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Ações',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
              'data-uid': 'src/pages/Users.tsx:105:11',
              'data-prohibitions': '[editContent]',
              children: users.map((user) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  TableRow,
                  {
                    'data-uid': 'src/pages/Users.tsx:107:15',
                    'data-prohibitions': '[editContent]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                        'data-uid': 'src/pages/Users.tsx:108:17',
                        'data-prohibitions': '[editContent]',
                        className: 'flex items-center gap-3',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
                            'data-uid': 'src/pages/Users.tsx:109:19',
                            'data-prohibitions': '[editContent]',
                            className: 'h-8 w-8',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                                'data-uid': 'src/pages/Users.tsx:110:21',
                                'data-prohibitions': '[editContent]',
                                src: user.avatar,
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
                                'data-uid': 'src/pages/Users.tsx:111:21',
                                'data-prohibitions': '[editContent]',
                                children: user.name[0],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/Users.tsx:113:19',
                            'data-prohibitions': '[editContent]',
                            className: 'font-medium',
                            children: user.name,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/pages/Users.tsx:115:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-muted-foreground',
                        children: user.email,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/pages/Users.tsx:116:17',
                        'data-prohibitions': '[editContent]',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                          'data-uid': 'src/pages/Users.tsx:117:19',
                          'data-prohibitions': '[editContent]',
                          variant:
                            user.role === 'admin'
                              ? 'destructive'
                              : user.role === 'supervisor'
                                ? 'default'
                                : 'secondary',
                          className: 'uppercase text-[10px]',
                          children: user.role,
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/pages/Users.tsx:130:17',
                        'data-prohibitions': '[editContent]',
                        children: user.department || '-',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/pages/Users.tsx:131:17',
                        'data-prohibitions': '[]',
                        className: 'text-right',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                          'data-uid': 'src/pages/Users.tsx:132:19',
                          'data-prohibitions': '[]',
                          variant: 'ghost',
                          size: 'sm',
                          onClick: () => setEditingUser(user),
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                            'data-uid': 'src/pages/Users.tsx:133:21',
                            'data-prohibitions': '[editContent]',
                            className: 'h-4 w-4',
                          }),
                        }),
                      }),
                    ],
                  },
                  user.id,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/pages/Users.tsx:142:7',
        'data-prohibitions': '[editContent]',
        open: !!editingUser,
        onOpenChange: (o) => !o && setEditingUser(null),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/pages/Users.tsx:143:9',
          'data-prohibitions': '[editContent]',
          className: 'sm:max-w-md',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/pages/Users.tsx:144:11',
              'data-prohibitions': '[editContent]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
                'data-uid': 'src/pages/Users.tsx:145:13',
                'data-prohibitions': '[editContent]',
                children: [editingUser?.id ? 'Editar' : 'Novo', ' Usuário'],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/Users.tsx:147:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:148:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/Users.tsx:149:15',
                      'data-prohibitions': '[]',
                      children: 'Nome Completo',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/pages/Users.tsx:150:15',
                      'data-prohibitions': '[editContent]',
                      value: editingUser?.name || '',
                      onChange: (e) =>
                        setEditingUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:155:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/Users.tsx:156:15',
                      'data-prohibitions': '[]',
                      children: 'Email',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/pages/Users.tsx:157:15',
                      'data-prohibitions': '[editContent]',
                      type: 'email',
                      value: editingUser?.email || '',
                      onChange: (e) =>
                        setEditingUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:163:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:164:15',
                      'data-prohibitions': '[]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Users.tsx:165:17',
                          'data-prohibitions': '[]',
                          children: 'Nível de Acesso',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Users.tsx:166:17',
                          'data-prohibitions': '[]',
                          value: editingUser?.role || 'operator',
                          onValueChange: (v) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              role: v,
                            })),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Users.tsx:170:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Users.tsx:171:21',
                                'data-prohibitions': '[editContent]',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                              'data-uid': 'src/pages/Users.tsx:173:19',
                              'data-prohibitions': '[]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:174:21',
                                  'data-prohibitions': '[]',
                                  value: 'admin',
                                  children: 'Administrador',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:175:21',
                                  'data-prohibitions': '[]',
                                  value: 'supervisor',
                                  children: 'Supervisor',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:176:21',
                                  'data-prohibitions': '[]',
                                  value: 'operator',
                                  children: 'Operador',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:180:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Users.tsx:181:17',
                          'data-prohibitions': '[]',
                          children: 'Departamento',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Users.tsx:182:17',
                          'data-prohibitions': '[editContent]',
                          value: editingUser?.department || 'Nenhum',
                          onValueChange: (v) =>
                            setEditingUser((prev) => ({
                              ...prev,
                              department: v,
                            })),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Users.tsx:186:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Users.tsx:187:21',
                                'data-prohibitions': '[editContent]',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                              'data-uid': 'src/pages/Users.tsx:189:19',
                              'data-prohibitions': '[editContent]',
                              children: DEPARTMENTS.map((d) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  SelectItem,
                                  {
                                    'data-uid': 'src/pages/Users.tsx:191:23',
                                    'data-prohibitions': '[editContent]',
                                    value: d,
                                    children: d,
                                  },
                                  d,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              'data-uid': 'src/pages/Users.tsx:200:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Users.tsx:201:13',
                  'data-prohibitions': '[]',
                  variant: 'outline',
                  onClick: () => setEditingUser(null),
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Users.tsx:204:13',
                  'data-prohibitions': '[]',
                  onClick: handleSave,
                  children: 'Salvar',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
//#endregion
export { Users as default }

//# sourceMappingURL=Users-vTsPKTxx.js.map
