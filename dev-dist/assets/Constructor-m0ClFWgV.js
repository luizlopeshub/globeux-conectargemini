import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import {
  c as createContextScope,
  l as composeEventHandlers,
  r as Primitive,
  t as useControllableState,
  u as toast,
} from './dist-Ba8o5ZKm.js'
import { o as useComposedRefs, t as Button } from './button-BhsDJ-bV.js'
import { n as generateId, r as createLucideIcon, t as cn } from './utils-DeT4lGOf.js'
import {
  a as Camera,
  i as MapPin,
  n as Label,
  r as Save,
  t as usePrevious,
} from './dist-4omyQ2lm.js'
import { d as Input, f as useSize, t as useAppStore } from './index-B1HnjcBV.js'
import { t as Card } from './card-G1v-sgTB.js'
var Calculator = createLucideIcon('calculator', [
  [
    'rect',
    {
      width: '16',
      height: '20',
      x: '4',
      y: '2',
      rx: '2',
      key: '1nb95v',
    },
  ],
  [
    'line',
    {
      x1: '8',
      x2: '16',
      y1: '6',
      y2: '6',
      key: 'x4nwl0',
    },
  ],
  [
    'line',
    {
      x1: '16',
      x2: '16',
      y1: '14',
      y2: '18',
      key: 'wjye3r',
    },
  ],
  [
    'path',
    {
      d: 'M16 10h.01',
      key: '1m94wz',
    },
  ],
  [
    'path',
    {
      d: 'M12 10h.01',
      key: '1nrarc',
    },
  ],
  [
    'path',
    {
      d: 'M8 10h.01',
      key: '19clt8',
    },
  ],
  [
    'path',
    {
      d: 'M12 14h.01',
      key: '1etili',
    },
  ],
  [
    'path',
    {
      d: 'M8 14h.01',
      key: '6423bh',
    },
  ],
  [
    'path',
    {
      d: 'M12 18h.01',
      key: 'mhygvu',
    },
  ],
  [
    'path',
    {
      d: 'M8 18h.01',
      key: 'lrp35t',
    },
  ],
])
var GripVertical = createLucideIcon('grip-vertical', [
  [
    'circle',
    {
      cx: '9',
      cy: '12',
      r: '1',
      key: '1vctgf',
    },
  ],
  [
    'circle',
    {
      cx: '9',
      cy: '5',
      r: '1',
      key: 'hp0tcf',
    },
  ],
  [
    'circle',
    {
      cx: '9',
      cy: '19',
      r: '1',
      key: 'fkjjf6',
    },
  ],
  [
    'circle',
    {
      cx: '15',
      cy: '12',
      r: '1',
      key: '1tmaij',
    },
  ],
  [
    'circle',
    {
      cx: '15',
      cy: '5',
      r: '1',
      key: '19l28e',
    },
  ],
  [
    'circle',
    {
      cx: '15',
      cy: '19',
      r: '1',
      key: 'f4zoj3',
    },
  ],
])
var Hash = createLucideIcon('hash', [
  [
    'line',
    {
      x1: '4',
      x2: '20',
      y1: '9',
      y2: '9',
      key: '4lhtct',
    },
  ],
  [
    'line',
    {
      x1: '4',
      x2: '20',
      y1: '15',
      y2: '15',
      key: 'vyu0kd',
    },
  ],
  [
    'line',
    {
      x1: '10',
      x2: '8',
      y1: '3',
      y2: '21',
      key: '1ggp8o',
    },
  ],
  [
    'line',
    {
      x1: '16',
      x2: '14',
      y1: '3',
      y2: '21',
      key: 'weycgp',
    },
  ],
])
var ListFilter = createLucideIcon('list-filter', [
  [
    'path',
    {
      d: 'M2 5h20',
      key: '1fs1ex',
    },
  ],
  [
    'path',
    {
      d: 'M6 12h12',
      key: '8npq4p',
    },
  ],
  [
    'path',
    {
      d: 'M9 19h6',
      key: '456am0',
    },
  ],
])
var Signature = createLucideIcon('signature', [
  [
    'path',
    {
      d: 'm21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284',
      key: 'y32ogt',
    },
  ],
  [
    'path',
    {
      d: 'M3 21h18',
      key: 'itz85i',
    },
  ],
])
var SquareCheckBig = createLucideIcon('square-check-big', [
  [
    'path',
    {
      d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344',
      key: '2acyp4',
    },
  ],
  [
    'path',
    {
      d: 'm9 11 3 3L22 4',
      key: '1pflzl',
    },
  ],
])
var Trash2 = createLucideIcon('trash-2', [
  [
    'path',
    {
      d: 'M10 11v6',
      key: 'nco0om',
    },
  ],
  [
    'path',
    {
      d: 'M14 11v6',
      key: 'outv1u',
    },
  ],
  [
    'path',
    {
      d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
      key: 'miytrc',
    },
  ],
  [
    'path',
    {
      d: 'M3 6h18',
      key: 'd0wm0j',
    },
  ],
  [
    'path',
    {
      d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
      key: 'e791ji',
    },
  ],
])
var Type = createLucideIcon('type', [
  [
    'path',
    {
      d: 'M12 4v16',
      key: '1654pz',
    },
  ],
  [
    'path',
    {
      d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2',
      key: 'e0r10z',
    },
  ],
  [
    'path',
    {
      d: 'M9 20h6',
      key: 's66wpe',
    },
  ],
])
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_e3738c514c10df2ef7e24af5ee461853/node_modules/@radix-ui/react-switch/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var SWITCH_NAME = 'Switch'
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME)
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME)
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeSwitch,
    name,
    checked: checkedProp,
    defaultChecked,
    required,
    disabled,
    value = 'on',
    onCheckedChange,
    form,
    ...switchProps
  } = props
  const [button, setButton] = import_react.useState(null)
  const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node))
  const hasConsumerStoppedPropagationRef = import_react.useRef(false)
  const isFormControl = button ? form || !!button.closest('form') : true
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: SWITCH_NAME,
  })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
    scope: __scopeSwitch,
    checked,
    disabled,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
        type: 'button',
        role: 'switch',
        'aria-checked': checked,
        'aria-required': required,
        'data-state': getState(checked),
        'data-disabled': disabled ? '' : void 0,
        disabled,
        value,
        ...switchProps,
        ref: composedRefs,
        onClick: composeEventHandlers(props.onClick, (event) => {
          setChecked((prevChecked) => !prevChecked)
          if (isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped()
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation()
          }
        }),
      }),
      isFormControl &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: 'translateX(-100%)' },
        }),
    ],
  })
})
Switch$1.displayName = SWITCH_NAME
var THUMB_NAME = 'SwitchThumb'
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeSwitch, ...thumbProps } = props
  const context = useSwitchContext(THUMB_NAME, __scopeSwitch)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
    'data-state': getState(context.checked),
    'data-disabled': context.disabled ? '' : void 0,
    ...thumbProps,
    ref: forwardedRef,
  })
})
SwitchThumb.displayName = THUMB_NAME
var BUBBLE_INPUT_NAME = 'SwitchBubbleInput'
var SwitchBubbleInput = import_react.forwardRef(
  ({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
    const ref = import_react.useRef(null)
    const composedRefs = useComposedRefs(ref, forwardedRef)
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)
    import_react.useEffect(() => {
      const input = ref.current
      if (!input) return
      const inputProto = window.HTMLInputElement.prototype
      const setChecked = Object.getOwnPropertyDescriptor(inputProto, 'checked').set
      if (prevChecked !== checked && setChecked) {
        const event = new Event('click', { bubbles })
        setChecked.call(input, checked)
        input.dispatchEvent(event)
      }
    }, [prevChecked, checked, bubbles])
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
      type: 'checkbox',
      'aria-hidden': true,
      defaultChecked: checked,
      ...props,
      tabIndex: -1,
      ref: composedRefs,
      style: {
        ...props.style,
        ...controlSize,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      },
    })
  },
)
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME
function getState(checked) {
  return checked ? 'checked' : 'unchecked'
}
var Root = Switch$1
var Thumb = SwitchThumb
//#endregion
//#region src/components/ui/switch.tsx
var Switch = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    'data-uid': 'src/components/ui/switch.tsx:11:3',
    'data-prohibitions': '[editContent]',
    className: cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className,
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
      'data-uid': 'src/components/ui/switch.tsx:19:5',
      'data-prohibitions': '[editContent]',
      className: cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      ),
    }),
  }),
)
Switch.displayName = Root.displayName
//#endregion
//#region src/components/constructor/Toolbox.tsx
function Toolbox({ onAdd }) {
  const tools = [
    {
      type: 'text',
      icon: Type,
      label: 'Texto Curto',
    },
    {
      type: 'number',
      icon: Hash,
      label: 'Número',
    },
    {
      type: 'radio',
      icon: ListFilter,
      label: 'Seleção Única',
    },
    {
      type: 'checkbox',
      icon: SquareCheckBig,
      label: 'Múltipla Escolha',
    },
    {
      type: 'gps',
      icon: MapPin,
      label: 'Localização GPS',
    },
    {
      type: 'camera',
      icon: Camera,
      label: 'Foto / Câmera',
    },
    {
      type: 'signature',
      icon: Signature,
      label: 'Assinatura',
    },
    {
      type: 'calculation',
      icon: Calculator,
      label: 'Cálculo',
    },
  ]
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/components/constructor/Toolbox.tsx:27:5',
    'data-prohibitions': '[editContent]',
    className: 'w-64 bg-card border rounded-lg p-4 shadow-sm flex flex-col',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
        'data-uid': 'src/components/constructor/Toolbox.tsx:28:7',
        'data-prohibitions': '[]',
        className: 'font-semibold text-lg mb-4',
        children: 'Componentes',
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/components/constructor/Toolbox.tsx:29:7',
        'data-prohibitions': '[editContent]',
        className: 'space-y-2 flex-1 overflow-y-auto',
        children: tools.map((tool) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            Button,
            {
              'data-uid': 'src/components/constructor/Toolbox.tsx:31:11',
              'data-prohibitions': '[editContent]',
              variant: 'outline',
              className: 'w-full justify-start gap-3 bg-background hover:bg-muted',
              onClick: () => onAdd(tool.type),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tool.icon, {
                  'data-uid': 'src/components/constructor/Toolbox.tsx:37:13',
                  'data-prohibitions': '[editContent]',
                  className: 'h-4 w-4 text-primary',
                }),
                tool.label,
              ],
            },
            tool.type,
          ),
        ),
      }),
    ],
  })
}
//#endregion
//#region src/pages/Constructor.tsx
function Constructor() {
  const { addTemplate } = useAppStore()
  const [templateName, setTemplateName] = (0, import_react.useState)('Novo Checklist')
  const [fields, setFields] = (0, import_react.useState)([])
  const [activeFieldId, setActiveFieldId] = (0, import_react.useState)(null)
  const handleAddField = (type) => {
    const newField = {
      id: `field_${generateId().substring(0, 6)}`,
      type,
      label: `Novo Campo (${type})`,
      required: false,
    }
    setFields([...fields, newField])
    setActiveFieldId(newField.id)
  }
  const handleUpdateField = (id, updates) => {
    setFields(
      fields.map((f) =>
        f.id === id
          ? {
              ...f,
              ...updates,
            }
          : f,
      ),
    )
  }
  const handleRemoveField = (id) => {
    setFields(fields.filter((f) => f.id !== id))
    if (activeFieldId === id) setActiveFieldId(null)
  }
  const handleSave = () => {
    if (!templateName || fields.length === 0) {
      toast({
        title: 'Erro',
        description: 'Adicione um nome e pelo menos um campo.',
        variant: 'destructive',
      })
      return
    }
    addTemplate({
      id: `tmpl_${generateId()}`,
      name: templateName,
      description: 'Template gerado pelo construtor.',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
      fields,
    })
    toast({
      title: 'Sucesso',
      description: 'Template salvo com sucesso!',
    })
    setFields([])
    setTemplateName('Novo Checklist')
    setActiveFieldId(null)
  }
  const activeField = fields.find((f) => f.id === activeFieldId)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Constructor.tsx:66:5',
    'data-prohibitions': '[editContent]',
    className: 'flex h-[calc(100vh-8rem)] gap-4 overflow-hidden',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbox, {
        'data-uid': 'src/pages/Constructor.tsx:67:7',
        'data-prohibitions': '[editContent]',
        onAdd: handleAddField,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Constructor.tsx:69:7',
        'data-prohibitions': '[editContent]',
        className:
          'flex-1 flex flex-col gap-4 overflow-hidden bg-muted/30 p-4 rounded-lg border border-border',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/Constructor.tsx:70:9',
            'data-prohibitions': '[]',
            className: 'flex justify-between items-center bg-card p-3 rounded-md shadow-sm border',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                'data-uid': 'src/pages/Constructor.tsx:71:11',
                'data-prohibitions': '[editContent]',
                value: templateName,
                onChange: (e) => setTemplateName(e.target.value),
                className:
                  'max-w-xs font-semibold text-lg border-none shadow-none focus-visible:ring-0',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                'data-uid': 'src/pages/Constructor.tsx:76:11',
                'data-prohibitions': '[]',
                onClick: handleSave,
                className: 'gap-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
                    'data-uid': 'src/pages/Constructor.tsx:77:13',
                    'data-prohibitions': '[editContent]',
                    className: 'h-4 w-4',
                  }),
                  ' Salvar Template',
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            'data-uid': 'src/pages/Constructor.tsx:81:9',
            'data-prohibitions': '[editContent]',
            className: 'flex-1 overflow-y-auto space-y-3 p-1',
            children:
              fields.length === 0
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    'data-uid': 'src/pages/Constructor.tsx:83:13',
                    'data-prohibitions': '[]',
                    className:
                      'h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg',
                    children: 'Arraste ou clique nos componentes ao lado para começar',
                  })
                : fields.map((f) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      Card,
                      {
                        'data-uid': 'src/pages/Constructor.tsx:88:15',
                        'data-prohibitions': '[editContent]',
                        className: `p-4 cursor-pointer transition-all ${activeFieldId === f.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`,
                        onClick: () => setActiveFieldId(f.id),
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Constructor.tsx:93:17',
                          'data-prohibitions': '[editContent]',
                          className: 'flex items-start gap-3',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
                              'data-uid': 'src/pages/Constructor.tsx:94:19',
                              'data-prohibitions': '[editContent]',
                              className: 'h-5 w-5 text-muted-foreground mt-1 cursor-move',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Constructor.tsx:95:19',
                              'data-prohibitions': '[editContent]',
                              className: 'flex-1',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Constructor.tsx:96:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'font-medium flex items-center gap-2',
                                  children: [
                                    f.label,
                                    f.required &&
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                        'data-uid': 'src/pages/Constructor.tsx:98:38',
                                        'data-prohibitions': '[]',
                                        className: 'text-destructive',
                                        children: '*',
                                      }),
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                  'data-uid': 'src/pages/Constructor.tsx:100:21',
                                  'data-prohibitions': '[editContent]',
                                  className:
                                    'text-xs text-muted-foreground mt-1 uppercase tracking-wider',
                                  children: f.type,
                                }),
                                f.logicDependsOn &&
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Constructor.tsx:104:23',
                                    'data-prohibitions': '[editContent]',
                                    className:
                                      'text-xs bg-orange-100 text-orange-800 p-1 mt-2 rounded inline-block',
                                    children: [
                                      'Lógica: Mostrar se ',
                                      f.logicDependsOn,
                                      ' = ',
                                      f.logicValue,
                                    ],
                                  }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                              'data-uid': 'src/pages/Constructor.tsx:109:19',
                              'data-prohibitions': '[]',
                              variant: 'ghost',
                              size: 'icon',
                              onClick: (e) => {
                                e.stopPropagation()
                                handleRemoveField(f.id)
                              },
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                                'data-uid': 'src/pages/Constructor.tsx:117:21',
                                'data-prohibitions': '[editContent]',
                                className: 'h-4 w-4 text-destructive',
                              }),
                            }),
                          ],
                        }),
                      },
                      f.id,
                    ),
                  ),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Constructor.tsx:126:7',
        'data-prohibitions': '[editContent]',
        className: 'w-80 bg-card border rounded-lg p-4 overflow-y-auto shadow-sm',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
            'data-uid': 'src/pages/Constructor.tsx:127:9',
            'data-prohibitions': '[]',
            className: 'font-semibold text-lg mb-4 pb-2 border-b',
            children: 'Propriedades',
          }),
          !activeField
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                'data-uid': 'src/pages/Constructor.tsx:129:11',
                'data-prohibitions': '[]',
                className: 'text-sm text-muted-foreground',
                children: 'Selecione um campo no centro para editar.',
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/pages/Constructor.tsx:131:11',
                'data-prohibitions': '[editContent]',
                className: 'space-y-4 animate-in fade-in slide-in-from-right-4',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/Constructor.tsx:132:13',
                    'data-prohibitions': '[]',
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                        'data-uid': 'src/pages/Constructor.tsx:133:15',
                        'data-prohibitions': '[]',
                        children: 'Label da Pergunta',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        'data-uid': 'src/pages/Constructor.tsx:134:15',
                        'data-prohibitions': '[editContent]',
                        value: activeField.label,
                        onChange: (e) =>
                          handleUpdateField(activeField.id, { label: e.target.value }),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/Constructor.tsx:140:13',
                    'data-prohibitions': '[]',
                    className: 'flex items-center justify-between',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                        'data-uid': 'src/pages/Constructor.tsx:141:15',
                        'data-prohibitions': '[]',
                        children: 'Obrigatório?',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                        'data-uid': 'src/pages/Constructor.tsx:142:15',
                        'data-prohibitions': '[editContent]',
                        checked: activeField.required,
                        onCheckedChange: (c) => handleUpdateField(activeField.id, { required: c }),
                      }),
                    ],
                  }),
                  (activeField.type === 'radio' || activeField.type === 'checkbox') &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Constructor.tsx:149:15',
                      'data-prohibitions': '[]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Constructor.tsx:150:17',
                          'data-prohibitions': '[]',
                          children: 'Opções (separadas por vírgula)',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Constructor.tsx:151:17',
                          'data-prohibitions': '[editContent]',
                          value: activeField.options || '',
                          onChange: (e) =>
                            handleUpdateField(activeField.id, { options: e.target.value }),
                          placeholder: 'Ex: Sim, Não, N/A',
                        }),
                      ],
                    }),
                  activeField.type === 'calculation' &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Constructor.tsx:160:15',
                      'data-prohibitions': '[]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Constructor.tsx:161:17',
                          'data-prohibitions': '[]',
                          children: 'Fórmula',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Constructor.tsx:162:17',
                          'data-prohibitions': '[editContent]',
                          value: activeField.calculation || '',
                          onChange: (e) =>
                            handleUpdateField(activeField.id, { calculation: e.target.value }),
                          placeholder: 'Ex: {{field_1}} * 2',
                          className: 'font-mono text-xs',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Constructor.tsx:170:17',
                          'data-prohibitions': '[]',
                          className: 'text-xs text-muted-foreground',
                          children: 'Use os IDs dos campos entre chaves.',
                        }),
                      ],
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/Constructor.tsx:174:13',
                    'data-prohibitions': '[editContent]',
                    className: 'pt-4 border-t space-y-4',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h4', {
                        'data-uid': 'src/pages/Constructor.tsx:175:15',
                        'data-prohibitions': '[]',
                        className: 'font-medium text-sm text-primary',
                        children: 'Lógica de Exibição',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/pages/Constructor.tsx:176:15',
                        'data-prohibitions': '[editContent]',
                        className: 'space-y-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                            'data-uid': 'src/pages/Constructor.tsx:177:17',
                            'data-prohibitions': '[]',
                            children: 'Depende do campo (ID)',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('select', {
                            'data-uid': 'src/pages/Constructor.tsx:178:17',
                            'data-prohibitions': '[editContent]',
                            className:
                              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                            value: activeField.logicDependsOn || '',
                            onChange: (e) =>
                              handleUpdateField(activeField.id, { logicDependsOn: e.target.value }),
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('option', {
                                'data-uid': 'src/pages/Constructor.tsx:185:19',
                                'data-prohibitions': '[]',
                                value: '',
                                children: 'Sempre visível',
                              }),
                              fields
                                .filter((f) => f.id !== activeField.id)
                                .map((f) =>
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    'option',
                                    {
                                      'data-uid': 'src/pages/Constructor.tsx:189:23',
                                      'data-prohibitions': '[editContent]',
                                      value: f.id,
                                      children: [f.label, ' (', f.id, ')'],
                                    },
                                    f.id,
                                  ),
                                ),
                            ],
                          }),
                        ],
                      }),
                      activeField.logicDependsOn &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Constructor.tsx:196:17',
                          'data-prohibitions': '[]',
                          className: 'space-y-2 animate-in slide-down',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                              'data-uid': 'src/pages/Constructor.tsx:197:19',
                              'data-prohibitions': '[]',
                              children: 'Mostrar apenas quando o valor for:',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                              'data-uid': 'src/pages/Constructor.tsx:198:19',
                              'data-prohibitions': '[editContent]',
                              value: activeField.logicValue || '',
                              onChange: (e) =>
                                handleUpdateField(activeField.id, { logicValue: e.target.value }),
                              placeholder: 'Ex: Avariado',
                            }),
                          ],
                        }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    'data-uid': 'src/pages/Constructor.tsx:209:13',
                    'data-prohibitions': '[editContent]',
                    className: 'pt-4 border-t',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                      'data-uid': 'src/pages/Constructor.tsx:210:15',
                      'data-prohibitions': '[editContent]',
                      className: 'text-xs text-muted-foreground font-mono bg-muted p-2 rounded',
                      children: ['ID: ', activeField.id],
                    }),
                  }),
                ],
              }),
        ],
      }),
    ],
  })
}
//#endregion
export { Constructor as default }

//# sourceMappingURL=Constructor-m0ClFWgV.js.map
