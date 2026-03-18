import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-DrpR9Qps.js'
import {
  d as createContextScope,
  f as composeEventHandlers,
  n as useControllableState,
  o as Primitive,
  p as toast,
  r as Presence,
} from './dist-CRzU7Mw_.js'
import { o as useComposedRefs, t as Button } from './button-4pbr5ZBd.js'
import { n as useSize } from './dist-CW6ASPE9.js'
import { n as generateId, r as createLucideIcon, t as cn } from './utils-BK5XrqCc.js'
import {
  a as usePrevious,
  c as MapPin,
  i as useDirection,
  l as Check,
  n as Root,
  o as Label,
  r as createRovingFocusGroupScope,
  s as Save,
  t as Item,
  u as Camera,
} from './dist-B-TRVaUU.js'
import { b as useNavigate, t as useAppStore, u as Input, x as useParams } from './index-CybwkUNF.js'
import { n as CardContent, t as Card } from './card-D7ingX8J.js'
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var __iconNode$2 = [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay',
    },
  ],
]
var Circle = createLucideIcon('circle', __iconNode$2)
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/pen-line.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var __iconNode$1 = [
  [
    'path',
    {
      d: 'M13 21h8',
      key: '1jsn5i',
    },
  ],
  [
    'path',
    {
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
      key: '1a8usu',
    },
  ],
]
var PenLine = createLucideIcon('pen-line', __iconNode$1)
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/send.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var __iconNode = [
  [
    'path',
    {
      d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
      key: '1ffxy3',
    },
  ],
  [
    'path',
    {
      d: 'm21.854 2.147-10.94 10.939',
      key: '12cjpa',
    },
  ],
]
var Send = createLucideIcon('send', __iconNode)
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cc2a70da647cefa06e7f90fd9b481f08/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var RADIO_NAME = 'Radio'
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME)
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME)
var Radio = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeRadio,
    name,
    checked = false,
    required,
    disabled,
    value = 'on',
    onCheck,
    form,
    ...radioProps
  } = props
  const [button, setButton] = import_react.useState(null)
  const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node))
  const hasConsumerStoppedPropagationRef = import_react.useRef(false)
  const isFormControl = button ? form || !!button.closest('form') : true
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioProvider, {
    scope: __scopeRadio,
    checked,
    disabled,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
        type: 'button',
        role: 'radio',
        'aria-checked': checked,
        'data-state': getState$1(checked),
        'data-disabled': disabled ? '' : void 0,
        disabled,
        value,
        ...radioProps,
        ref: composedRefs,
        onClick: composeEventHandlers(props.onClick, (event) => {
          if (!checked) onCheck?.()
          if (isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped()
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation()
          }
        }),
      }),
      isFormControl &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
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
Radio.displayName = RADIO_NAME
var INDICATOR_NAME$1 = 'RadioIndicator'
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeRadio, forceMount, ...indicatorProps } = props
  const context = useRadioContext(INDICATOR_NAME$1, __scopeRadio)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
    present: forceMount || context.checked,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
      'data-state': getState$1(context.checked),
      'data-disabled': context.disabled ? '' : void 0,
      ...indicatorProps,
      ref: forwardedRef,
    }),
  })
})
RadioIndicator.displayName = INDICATOR_NAME$1
var BUBBLE_INPUT_NAME$1 = 'RadioBubbleInput'
var RadioBubbleInput = import_react.forwardRef(
  ({ __scopeRadio, control, checked, bubbles = true, ...props }, forwardedRef) => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
      type: 'radio',
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
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME$1
function getState$1(checked) {
  return checked ? 'checked' : 'unchecked'
}
var ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
var RADIO_GROUP_NAME = 'RadioGroup'
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope,
])
var useRovingFocusGroupScope = createRovingFocusGroupScope()
var useRadioScope = createRadioScope()
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME)
var RadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeRadioGroup,
    name,
    defaultValue,
    value: valueProp,
    required = false,
    disabled = false,
    orientation,
    dir,
    loop = true,
    onValueChange,
    ...groupProps
  } = props
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup)
  const direction = useDirection(dir)
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? null,
    onChange: onValueChange,
    caller: RADIO_GROUP_NAME,
  })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
    scope: __scopeRadioGroup,
    name,
    required,
    disabled,
    value,
    onValueChange: setValue,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation,
      dir: direction,
      loop,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
        role: 'radiogroup',
        'aria-required': required,
        'aria-orientation': orientation,
        'data-disabled': disabled ? '' : void 0,
        dir: direction,
        ...groupProps,
        ref: forwardedRef,
      }),
    }),
  })
})
RadioGroup$1.displayName = RADIO_GROUP_NAME
var ITEM_NAME = 'RadioGroupItem'
var RadioGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeRadioGroup, disabled, ...itemProps } = props
  const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup)
  const isDisabled = context.disabled || disabled
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup)
  const radioScope = useRadioScope(__scopeRadioGroup)
  const ref = import_react.useRef(null)
  const composedRefs = useComposedRefs(forwardedRef, ref)
  const checked = context.value === itemProps.value
  const isArrowKeyPressedRef = import_react.useRef(false)
  import_react.useEffect(() => {
    const handleKeyDown = (event) => {
      if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true
    }
    const handleKeyUp = () => (isArrowKeyPressedRef.current = false)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
    asChild: true,
    ...rovingFocusGroupScope,
    focusable: !isDisabled,
    active: checked,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
      disabled: isDisabled,
      required: context.required,
      checked,
      ...radioScope,
      ...itemProps,
      name: context.name,
      ref: composedRefs,
      onCheck: () => context.onValueChange(itemProps.value),
      onKeyDown: composeEventHandlers((event) => {
        if (event.key === 'Enter') event.preventDefault()
      }),
      onFocus: composeEventHandlers(itemProps.onFocus, () => {
        if (isArrowKeyPressedRef.current) ref.current?.click()
      }),
    }),
  })
})
RadioGroupItem$1.displayName = ITEM_NAME
var INDICATOR_NAME2 = 'RadioGroupIndicator'
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeRadioGroup, ...indicatorProps } = props
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
    ...useRadioScope(__scopeRadioGroup),
    ...indicatorProps,
    ref: forwardedRef,
  })
})
RadioGroupIndicator.displayName = INDICATOR_NAME2
var Root2 = RadioGroup$1
var Item2 = RadioGroupItem$1
var Indicator = RadioGroupIndicator
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    'data-uid': 'src/components/ui/radio-group.tsx:12:10',
    'data-prohibitions': '[editContent]',
    className: cn('grid gap-2', className),
    ...props,
    ref,
  })
})
RadioGroup.displayName = Root2.displayName
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
    'data-uid': 'src/components/ui/radio-group.tsx:21:5',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
      'data-uid': 'src/components/ui/radio-group.tsx:29:7',
      'data-prohibitions': '[]',
      className: 'flex items-center justify-center',
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
        'data-uid': 'src/components/ui/radio-group.tsx:30:9',
        'data-prohibitions': '[editContent]',
        className: 'h-2.5 w-2.5 fill-current text-current',
      }),
    }),
  })
})
RadioGroupItem.displayName = Item2.displayName
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var CHECKBOX_NAME = 'Checkbox'
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME)
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME)
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = 'on',
    internal_do_not_use_render,
  } = props
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME,
  })
  const [control, setControl] = import_react.useState(null)
  const [bubbleInput, setBubbleInput] = import_react.useState(null)
  const hasConsumerStoppedPropagationRef = import_react.useRef(false)
  const isFormControl = control ? !!form || !!control.closest('form') : true
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput,
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
    scope: __scopeCheckbox,
    ...context,
    children: isFunction(internal_do_not_use_render)
      ? internal_do_not_use_render(context)
      : children,
  })
}
var TRIGGER_NAME = 'CheckboxTrigger'
var CheckboxTrigger = import_react.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput,
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox)
    const composedRefs = useComposedRefs(forwardedRef, setControl)
    const initialCheckedStateRef = import_react.useRef(checked)
    import_react.useEffect(() => {
      const form = control?.form
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current)
        form.addEventListener('reset', reset)
        return () => form.removeEventListener('reset', reset)
      }
    }, [control, setChecked])
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
      type: 'button',
      role: 'checkbox',
      'aria-checked': isIndeterminate(checked) ? 'mixed' : checked,
      'aria-required': required,
      'data-state': getState(checked),
      'data-disabled': disabled ? '' : void 0,
      disabled,
      value,
      ...checkboxProps,
      ref: composedRefs,
      onKeyDown: composeEventHandlers(onKeyDown, (event) => {
        if (event.key === 'Enter') event.preventDefault()
      }),
      onClick: composeEventHandlers(onClick, (event) => {
        setChecked((prevChecked) => (isIndeterminate(prevChecked) ? true : !prevChecked))
        if (bubbleInput && isFormControl) {
          hasConsumerStoppedPropagationRef.current = event.isPropagationStopped()
          if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation()
        }
      }),
    })
  },
)
CheckboxTrigger.displayName = TRIGGER_NAME
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeCheckbox,
    name,
    checked,
    defaultChecked,
    required,
    disabled,
    value,
    onCheckedChange,
    form,
    ...checkboxProps
  } = props
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
    __scopeCheckbox,
    checked,
    defaultChecked,
    disabled,
    required,
    onCheckedChange,
    name,
    form,
    value,
    internal_do_not_use_render: ({ isFormControl }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
            ...checkboxProps,
            ref: forwardedRef,
            __scopeCheckbox,
          }),
          isFormControl &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox }),
        ],
      }),
  })
})
Checkbox$1.displayName = CHECKBOX_NAME
var INDICATOR_NAME = 'CheckboxIndicator'
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeCheckbox, forceMount, ...indicatorProps } = props
  const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
    present: forceMount || isIndeterminate(context.checked) || context.checked === true,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
      'data-state': getState(context.checked),
      'data-disabled': context.disabled ? '' : void 0,
      ...indicatorProps,
      ref: forwardedRef,
      style: {
        pointerEvents: 'none',
        ...props.style,
      },
    }),
  })
})
CheckboxIndicator.displayName = INDICATOR_NAME
var BUBBLE_INPUT_NAME = 'CheckboxBubbleInput'
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
  const {
    control,
    hasConsumerStoppedPropagationRef,
    checked,
    defaultChecked,
    required,
    disabled,
    name,
    value,
    form,
    bubbleInput,
    setBubbleInput,
  } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox)
  const composedRefs = useComposedRefs(forwardedRef, setBubbleInput)
  const prevChecked = usePrevious(checked)
  const controlSize = useSize(control)
  import_react.useEffect(() => {
    const input = bubbleInput
    if (!input) return
    const inputProto = window.HTMLInputElement.prototype
    const setChecked = Object.getOwnPropertyDescriptor(inputProto, 'checked').set
    const bubbles = !hasConsumerStoppedPropagationRef.current
    if (prevChecked !== checked && setChecked) {
      const event = new Event('click', { bubbles })
      input.indeterminate = isIndeterminate(checked)
      setChecked.call(input, isIndeterminate(checked) ? false : checked)
      input.dispatchEvent(event)
    }
  }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef])
  const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
    type: 'checkbox',
    'aria-hidden': true,
    defaultChecked: defaultChecked ?? defaultCheckedRef.current,
    required,
    disabled,
    name,
    value,
    form,
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
      transform: 'translateX(-100%)',
    },
  })
})
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME
function isFunction(value) {
  return typeof value === 'function'
}
function isIndeterminate(checked) {
  return checked === 'indeterminate'
}
function getState(checked) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
    'data-uid': 'src/components/ui/checkbox.tsx:12:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
      'data-uid': 'src/components/ui/checkbox.tsx:20:5',
      'data-prohibitions': '[editContent]',
      className: cn('flex items-center justify-center text-current'),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
        'data-uid': 'src/components/ui/checkbox.tsx:21:7',
        'data-prohibitions': '[editContent]',
        className: 'h-4 w-4',
      }),
    }),
  }),
)
Checkbox.displayName = Checkbox$1.displayName
//#endregion
//#region src/components/executor/FieldRenderer.tsx
function FieldRenderer({ field, value, onChange, allAnswers }) {
  const options = field.options ? field.options.split(',').map((s) => s.trim()) : []
  const calcValue = (0, import_react.useMemo)(() => {
    if (field.type !== 'calculation' || !field.calculation) return 0
    try {
      let formula = field.calculation
      Object.keys(allAnswers).forEach((key) => {
        const val = Number(allAnswers[key]) || 0
        formula = formula.replace(new RegExp(`{{${key}}}`, 'g'), val.toString())
      })
      return eval(formula)
    } catch {
      return 'Erro na fórmula'
    }
  }, [field.type, field.calculation, allAnswers])
  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:40:11',
          'data-prohibitions': '[editContent]',
          value: value || '',
          onChange: (e) => onChange(e.target.value),
          className: 'h-12 bg-white',
        })
      case 'number':
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:48:11',
          'data-prohibitions': '[editContent]',
          type: 'number',
          value: value || '',
          onChange: (e) => onChange(e.target.value),
          className: 'h-12 bg-white',
        })
      case 'radio':
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:57:11',
          'data-prohibitions': '[editContent]',
          value,
          onValueChange: onChange,
          className: 'flex flex-col gap-3',
          children: options.map((opt) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              'div',
              {
                'data-uid': 'src/components/executor/FieldRenderer.tsx:59:15',
                'data-prohibitions': '[editContent]',
                className:
                  'flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors cursor-pointer',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
                    'data-uid': 'src/components/executor/FieldRenderer.tsx:63:17',
                    'data-prohibitions': '[editContent]',
                    value: opt,
                    id: `${field.id}-${opt}`,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                    'data-uid': 'src/components/executor/FieldRenderer.tsx:64:17',
                    'data-prohibitions': '[editContent]',
                    htmlFor: `${field.id}-${opt}`,
                    className: 'flex-1 cursor-pointer',
                    children: opt,
                  }),
                ],
              },
              opt,
            ),
          ),
        })
      case 'checkbox':
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:73:11',
          'data-prohibitions': '[editContent]',
          className: 'flex flex-col gap-3',
          children: options.map((opt) => {
            const isChecked = Array.isArray(value) && value.includes(opt)
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              'div',
              {
                'data-uid': 'src/components/executor/FieldRenderer.tsx:77:17',
                'data-prohibitions': '[editContent]',
                className:
                  'flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
                    'data-uid': 'src/components/executor/FieldRenderer.tsx:81:19',
                    'data-prohibitions': '[editContent]',
                    id: `${field.id}-${opt}`,
                    checked: isChecked,
                    onCheckedChange: (c) => {
                      const current = Array.isArray(value) ? value : []
                      onChange(c ? [...current, opt] : current.filter((v) => v !== opt))
                    },
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                    'data-uid': 'src/components/executor/FieldRenderer.tsx:89:19',
                    'data-prohibitions': '[editContent]',
                    htmlFor: `${field.id}-${opt}`,
                    className: 'flex-1 cursor-pointer',
                    children: opt,
                  }),
                ],
              },
              opt,
            )
          }),
        })
      case 'gps':
        return value
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:99:11',
              'data-prohibitions': '[editContent]',
              className:
                'bg-emerald-50 text-emerald-700 p-4 rounded-md border border-emerald-200 flex items-center gap-2 font-mono text-sm',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:100:13',
                  'data-prohibitions': '[editContent]',
                  className: 'h-4 w-4',
                }),
                ' Coord: ',
                value,
              ],
            })
          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:103:11',
              'data-prohibitions': '[]',
              variant: 'outline',
              className: 'h-12 w-full gap-2 bg-white',
              onClick: () => onChange('-23.5505, -46.6333'),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:108:13',
                  'data-prohibitions': '[editContent]',
                  className: 'h-4 w-4 text-blue-500',
                }),
                ' Capturar Localização Atual',
              ],
            })
      case 'camera':
        return value
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:113:11',
              'data-prohibitions': '[]',
              className: 'relative rounded-md overflow-hidden border',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:114:13',
                  'data-prohibitions': '[editContent]',
                  src: value,
                  alt: 'Captura',
                  className: 'w-full h-48 object-cover',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:115:13',
                  'data-prohibitions': '[]',
                  variant: 'destructive',
                  size: 'sm',
                  className: 'absolute top-2 right-2',
                  onClick: () => onChange(null),
                  children: 'Remover',
                }),
              ],
            })
          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:125:11',
              'data-prohibitions': '[]',
              variant: 'outline',
              className: 'h-12 w-full gap-2 bg-white',
              onClick: () => onChange('https://img.usecurling.com/p/400/300?q=warehouse'),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:130:13',
                  'data-prohibitions': '[editContent]',
                  className: 'h-4 w-4 text-blue-500',
                }),
                ' Tirar Foto da Avaria',
              ],
            })
      case 'signature':
        return value
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:135:11',
              'data-prohibitions': '[]',
              className: 'border rounded-md bg-white p-4 text-center',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:136:13',
                  'data-prohibitions': '[editContent]',
                  src: 'https://img.usecurling.com/i?q=signature&shape=hand-drawn',
                  alt: 'Assinatura',
                  className: 'h-24 mx-auto opacity-70',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:141:13',
                  'data-prohibitions': '[]',
                  className: 'text-xs text-muted-foreground mt-2 font-mono',
                  children: 'Assinado digitalmente',
                }),
              ],
            })
          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              'data-uid': 'src/components/executor/FieldRenderer.tsx:144:11',
              'data-prohibitions': '[]',
              variant: 'outline',
              className: 'h-24 w-full border-dashed gap-2 bg-white flex flex-col',
              onClick: () => onChange('signed'),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:149:13',
                  'data-prohibitions': '[editContent]',
                  className: 'h-6 w-6 text-muted-foreground',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                  'data-uid': 'src/components/executor/FieldRenderer.tsx:150:13',
                  'data-prohibitions': '[]',
                  className: 'text-muted-foreground',
                  children: 'Toque para Assinar',
                }),
              ],
            })
      case 'calculation':
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:155:11',
          'data-prohibitions': '[editContent]',
          className:
            'bg-slate-100 p-4 rounded-md border font-mono text-lg font-semibold text-primary',
          children: ['= ', calcValue],
        })
      default:
        return null
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
    'data-uid': 'src/components/executor/FieldRenderer.tsx:165:5',
    'data-prohibitions': '[editContent]',
    className: 'border-muted shadow-sm',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
      'data-uid': 'src/components/executor/FieldRenderer.tsx:166:7',
      'data-prohibitions': '[editContent]',
      className: 'p-5',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
          'data-uid': 'src/components/executor/FieldRenderer.tsx:167:9',
          'data-prohibitions': '[editContent]',
          className: 'text-base font-medium mb-4 block',
          children: [
            field.label,
            ' ',
            field.required &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                'data-uid': 'src/components/executor/FieldRenderer.tsx:168:44',
                'data-prohibitions': '[]',
                className: 'text-destructive',
                children: '*',
              }),
          ],
        }),
        renderInput(),
      ],
    }),
  })
}
//#endregion
//#region src/pages/Executor.tsx
function Executor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templates, drafts, saveDraft, submitAudit } = useAppStore()
  const template = templates.find((t) => t.id === id)
  const [answers, setAnswers] = (0, import_react.useState)({})
  ;(0, import_react.useEffect)(() => {
    if (id && drafts[id]) {
      setAnswers(drafts[id])
      toast({ description: 'Rascunho recuperado com sucesso.' })
    }
  }, [id, drafts])
  if (!template)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      'data-uid': 'src/pages/Executor.tsx:27:12',
      'data-prohibitions': '[]',
      className: 'p-8 text-center',
      children: 'Template não encontrado.',
    })
  const handleChange = (fieldId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }
  const handleSaveDraft = () => {
    saveDraft(template.id, answers)
    toast({
      title: 'Sucesso',
      description: 'Rascunho salvo localmente.',
    })
    navigate('/')
  }
  const handleSubmit = () => {
    if (
      template.fields.find((f) => {
        if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false
        if (f.repeatsBasedOn) {
          const count = Number(answers[f.repeatsBasedOn]) || 0
          if (count <= 0) return false
          if (!f.required) return false
          for (let i = 0; i < count; i++) if (!answers[`${f.id}_${i}`]) return true
          return false
        }
        if (f.required && !answers[f.id]) return true
        return false
      })
    ) {
      toast({
        title: 'Campos obrigatórios',
        description: `Por favor, preencha os campos marcados como obrigatórios.`,
        variant: 'destructive',
      })
      return
    }
    submitAudit({
      id: `aud_${generateId().substring(0, 8)}`,
      templateId: template.id,
      templateName: template.name,
      operatorName: 'Operador Logístico 1',
      timestamp: /* @__PURE__ */ new Date().toISOString(),
      status: 'Concluído',
      answers,
    })
    toast({
      title: 'Auditoria Concluída',
      description: 'Os dados foram salvos e sincronizados.',
    })
    navigate('/')
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Executor.tsx:85:5',
    'data-prohibitions': '[editContent]',
    className: 'max-w-3xl mx-auto pb-24',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Executor.tsx:86:7',
        'data-prohibitions': '[editContent]',
        className: 'mb-6',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
            'data-uid': 'src/pages/Executor.tsx:87:9',
            'data-prohibitions': '[editContent]',
            className: 'text-2xl font-bold',
            children: template.name,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            'data-uid': 'src/pages/Executor.tsx:88:9',
            'data-prohibitions': '[editContent]',
            className: 'text-muted-foreground',
            children: template.description,
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/pages/Executor.tsx:91:7',
        'data-prohibitions': '[editContent]',
        className: 'space-y-6',
        children: template.fields.map((field) => {
          if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue)
            return null
          if (field.repeatsBasedOn) {
            const repeatCount = Number(answers[field.repeatsBasedOn]) || 0
            if (repeatCount <= 0) return null
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              'div',
              {
                'data-uid': 'src/pages/Executor.tsx:104:15',
                'data-prohibitions': '[editContent]',
                className: 'space-y-4 border-l-2 border-primary/30 pl-4 py-2 ml-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('h3', {
                    'data-uid': 'src/pages/Executor.tsx:105:17',
                    'data-prohibitions': '[editContent]',
                    className:
                      'text-sm font-semibold text-muted-foreground uppercase tracking-wide',
                    children: [field.label, ' (', repeatCount, 'x)'],
                  }),
                  Array.from({ length: repeatCount }).map((_, i) => {
                    const repeatedId = `${field.id}_${i}`
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      'div',
                      {
                        'data-uid': 'src/pages/Executor.tsx:111:21',
                        'data-prohibitions': '[]',
                        className: 'animate-in fade-in slide-in-from-bottom-4 duration-300',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRenderer, {
                          'data-uid': 'src/pages/Executor.tsx:115:23',
                          'data-prohibitions': '[editContent]',
                          field: {
                            ...field,
                            id: repeatedId,
                            label: `${field.label} #${i + 1}`,
                          },
                          value: answers[repeatedId],
                          onChange: (v) => handleChange(repeatedId, v),
                          allAnswers: answers,
                        }),
                      },
                      repeatedId,
                    )
                  }),
                ],
              },
              field.id,
            )
          }
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            'div',
            {
              'data-uid': 'src/pages/Executor.tsx:130:13',
              'data-prohibitions': '[]',
              className: 'animate-in fade-in slide-in-from-bottom-4 duration-300',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRenderer, {
                'data-uid': 'src/pages/Executor.tsx:131:15',
                'data-prohibitions': '[editContent]',
                field,
                value: answers[field.id],
                onChange: (v) => handleChange(field.id, v),
                allAnswers: answers,
              }),
            },
            field.id,
          )
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
        'data-uid': 'src/pages/Executor.tsx:142:7',
        'data-prohibitions': '[]',
        className:
          'fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t md:left-[16rem] z-10 flex justify-end gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            'data-uid': 'src/pages/Executor.tsx:143:9',
            'data-prohibitions': '[]',
            variant: 'outline',
            onClick: handleSaveDraft,
            className: 'gap-2 h-12 px-6',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
                'data-uid': 'src/pages/Executor.tsx:144:11',
                'data-prohibitions': '[editContent]',
                className: 'h-4 w-4',
              }),
              ' Salvar Rascunho',
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            'data-uid': 'src/pages/Executor.tsx:146:9',
            'data-prohibitions': '[]',
            onClick: handleSubmit,
            className: 'gap-2 h-12 px-8 bg-[#f59e0b] hover:bg-[#d97706] text-white',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
                'data-uid': 'src/pages/Executor.tsx:150:11',
                'data-prohibitions': '[editContent]',
                className: 'h-4 w-4',
              }),
              ' Finalizar Auditoria',
            ],
          }),
        ],
      }),
    ],
  })
}
//#endregion
export { Executor as default }

//# sourceMappingURL=Executor-BgUBnrO4.js.map
