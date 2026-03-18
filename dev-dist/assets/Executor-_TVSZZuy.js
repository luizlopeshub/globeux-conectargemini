import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import { b as composeEventHandlers, m as Primitive, s as useControllableState, y as createContextScope } from "./es2015-BvGAN_4N.js";
import { o as useComposedRefs, t as Button } from "./button-4pbr5ZBd.js";
import { s as useSize, t as useDirection } from "./dist-BkrhYOXl.js";
import { t as Presence } from "./dist-ClK7ZbbO.js";
import { n as generateId, r as createLucideIcon, t as cn } from "./utils-BK5XrqCc.js";
import { n as Camera, t as Checkbox } from "./checkbox-drwuuzL7.js";
import { o as usePrevious } from "./select-DjJ8d7xn.js";
import { t as SmartLookup } from "./SmartLookup-3LgOlKaQ.js";
import { t as MapPin } from "./map-pin-DNbKaYrd.js";
import { t as Save } from "./save-DUwVNF0n.js";
import { T as useParams, a as Item, b as Circle, g as Input, o as Root, s as createRovingFocusGroupScope, t as useAppStore, w as useNavigate, x as toast } from "./index-CdCNgsZi.js";
import { n as CardContent, t as Card } from "./card-vAp3GLwg.js";
import "./dialog-eAAUNCTN.js";
import { t as Label } from "./label-BFlnB3Nd.js";
var OctagonAlert = createLucideIcon("octagon-alert", [
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
		key: "1fd625"
	}]
]);
var PenLine = createLucideIcon("pen-line", [["path", {
	d: "M13 21h8",
	key: "1jsn5i"
}], ["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cc2a70da647cefa06e7f90fd9b481f08/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, name, checked = false, required, disabled, value = "on", onCheck, form, ...radioProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioProvider, {
		scope: __scopeRadio,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "radio",
			"aria-checked": checked,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...radioProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				if (!checked) onCheck?.();
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef
		})
	});
});
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = import_react.forwardRef(({ __scopeRadio, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "radio",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [createRovingFocusGroupScope, createRadioScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, name, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
		caller: RADIO_GROUP_NAME
	});
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
				role: "radiogroup",
				"aria-required": required,
				"aria-orientation": orientation,
				"data-disabled": disabled ? "" : void 0,
				dir: direction,
				...groupProps,
				ref: forwardedRef
			})
		})
	});
});
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, disabled, ...itemProps } = props;
	const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
	const isDisabled = context.disabled || disabled;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const checked = context.value === itemProps.value;
	const isArrowKeyPressedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true;
		};
		const handleKeyUp = () => isArrowKeyPressedRef.current = false;
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
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
				if (event.key === "Enter") event.preventDefault();
			}),
			onFocus: composeEventHandlers(itemProps.onFocus, () => {
				if (isArrowKeyPressedRef.current) ref.current?.click();
			})
		})
	});
});
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...indicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
		...useRadioScope(__scopeRadioGroup),
		...indicatorProps,
		ref: forwardedRef
	});
});
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-uid": "src/components/ui/radio-group.tsx:12:10",
		"data-prohibitions": "[editContent]",
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = Root2.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-uid": "src/components/ui/radio-group.tsx:21:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-uid": "src/components/ui/radio-group.tsx:29:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
				"data-uid": "src/components/ui/radio-group.tsx:30:9",
				"data-prohibitions": "[editContent]",
				className: "h-2.5 w-2.5 fill-current text-current"
			})
		})
	});
});
RadioGroupItem.displayName = Item2.displayName;
//#endregion
//#region src/components/executor/FieldRenderer.tsx
function FieldRenderer({ field, value, onChange, allAnswers, error }) {
	useAppStore();
	const options = field.options ? field.options.split(",").map((s) => s.trim()) : [];
	const calcValue = (0, import_react.useMemo)(() => {
		if (field.type !== "calculation") return 0;
		const sources = field.calcSourceFields || [];
		if (sources.length === 0) return 0;
		const vals = sources.map((id) => Number(allAnswers[id]) || 0);
		const sum = vals.reduce((acc, curr) => acc + curr, 0);
		if (field.calcOperation === "average") return vals.length ? (sum / vals.length).toFixed(2) : 0;
		return sum;
	}, [
		field.type,
		field.calcOperation,
		field.calcSourceFields,
		allAnswers
	]);
	const renderInput = () => {
		switch (field.type) {
			case "text": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:39:11",
				"data-prohibitions": "[editContent]",
				value: value || "",
				onChange: (e) => onChange(e.target.value),
				className: `h-12 bg-white ${error ? "border-destructive" : ""}`
			});
			case "number": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:47:11",
				"data-prohibitions": "[editContent]",
				type: "number",
				value: value || "",
				onChange: (e) => onChange(e.target.value),
				className: `h-12 bg-white ${error ? "border-destructive" : ""}`
			});
			case "lookup": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartLookup, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:56:11",
				"data-prohibitions": "[editContent]",
				value,
				onChange,
				defaultEntityType: field.lookupSource,
				allowEntityChange: !field.lookupSource,
				error: !!error
			});
			case "radio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:67:11",
				"data-prohibitions": "[editContent]",
				value,
				onValueChange: onChange,
				className: "flex flex-col gap-3",
				children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:69:15",
					"data-prohibitions": "[editContent]",
					className: "flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
						"data-uid": "src/components/executor/FieldRenderer.tsx:73:17",
						"data-prohibitions": "[editContent]",
						value: opt,
						id: `${field.id}-${opt}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/executor/FieldRenderer.tsx:74:17",
						"data-prohibitions": "[editContent]",
						htmlFor: `${field.id}-${opt}`,
						className: "flex-1 cursor-pointer",
						children: opt
					})]
				}, opt))
			});
			case "checkbox": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/executor/FieldRenderer.tsx:83:11",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col gap-3",
				children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:85:15",
					"data-prohibitions": "[editContent]",
					className: "flex items-center space-x-3 bg-white p-3 rounded-md border border-input has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						"data-uid": "src/components/executor/FieldRenderer.tsx:89:17",
						"data-prohibitions": "[editContent]",
						id: `${field.id}-${opt}`,
						checked: Array.isArray(value) && value.includes(opt),
						onCheckedChange: (c) => {
							const current = Array.isArray(value) ? value : [];
							onChange(c ? [...current, opt] : current.filter((v) => v !== opt));
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-uid": "src/components/executor/FieldRenderer.tsx:97:17",
						"data-prohibitions": "[editContent]",
						htmlFor: `${field.id}-${opt}`,
						className: "flex-1 cursor-pointer",
						children: opt
					})]
				}, opt))
			});
			case "gps": return value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/executor/FieldRenderer.tsx:106:11",
				"data-prohibitions": "[editContent]",
				className: "bg-emerald-50 text-emerald-700 p-4 rounded-md border border-emerald-200 flex items-center gap-2 font-mono text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/executor/FieldRenderer.tsx:107:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					" Coord: ",
					value
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:110:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "h-12 w-full gap-2 bg-white",
				onClick: () => onChange("-23.5505, -46.6333"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
					"data-uid": "src/components/executor/FieldRenderer.tsx:115:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 text-blue-500"
				}), " Capturar Localização"]
			});
			case "camera": return value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/executor/FieldRenderer.tsx:120:11",
				"data-prohibitions": "[]",
				className: "relative rounded-md overflow-hidden border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:121:13",
					"data-prohibitions": "[editContent]",
					src: value,
					alt: "Captura",
					className: "w-full h-48 object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/executor/FieldRenderer.tsx:122:13",
					"data-prohibitions": "[]",
					variant: "destructive",
					size: "sm",
					className: "absolute top-2 right-2",
					onClick: () => onChange(null),
					children: "Remover"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:132:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "h-12 w-full gap-2 bg-white",
				onClick: () => onChange("https://img.usecurling.com/p/400/300?q=warehouse"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
					"data-uid": "src/components/executor/FieldRenderer.tsx:137:13",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4 text-blue-500"
				}), " Tirar Foto"]
			});
			case "signature": return value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/executor/FieldRenderer.tsx:142:11",
				"data-prohibitions": "[]",
				className: "border rounded-md bg-white p-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:143:13",
					"data-prohibitions": "[editContent]",
					src: "https://img.usecurling.com/i?q=signature&shape=hand-drawn",
					alt: "Assinatura",
					className: "h-24 mx-auto opacity-70"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:148:13",
					"data-prohibitions": "[]",
					className: "text-xs text-muted-foreground mt-2 font-mono",
					children: "Assinado digitalmente"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/executor/FieldRenderer.tsx:151:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "h-24 w-full border-dashed gap-2 bg-white flex flex-col",
				onClick: () => onChange("signed"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
					"data-uid": "src/components/executor/FieldRenderer.tsx:156:13",
					"data-prohibitions": "[editContent]",
					className: "h-6 w-6 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:157:13",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Toque para Assinar"
				})]
			});
			case "calculation": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/executor/FieldRenderer.tsx:162:11",
				"data-prohibitions": "[editContent]",
				className: "bg-slate-100 p-4 rounded-md border font-mono text-lg font-semibold text-primary",
				children: ["= ", calcValue]
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/components/executor/FieldRenderer.tsx:172:5",
		"data-prohibitions": "[editContent]",
		className: `border-muted shadow-sm ${error ? "border-destructive/50 ring-1 ring-destructive/50" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/components/executor/FieldRenderer.tsx:175:7",
			"data-prohibitions": "[editContent]",
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					"data-uid": "src/components/executor/FieldRenderer.tsx:176:9",
					"data-prohibitions": "[editContent]",
					className: "text-base font-medium mb-4 block",
					children: [
						field.label,
						" ",
						field.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/executor/FieldRenderer.tsx:177:44",
							"data-prohibitions": "[]",
							className: "text-destructive",
							children: "*"
						})
					]
				}),
				renderInput(),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/executor/FieldRenderer.tsx:180:19",
					"data-prohibitions": "[editContent]",
					className: "text-sm font-medium text-destructive mt-3",
					children: error
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Executor.tsx
function Executor() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { templates, drafts, saveDraft, submitAudit, currentUser } = useAppStore();
	const template = templates.find((t) => t.id === id);
	const [answers, setAnswers] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (id && drafts[id]) {
			setAnswers(drafts[id]);
			toast({ description: "Rascunho recuperado." });
		}
	}, [id, drafts]);
	const hardValidationErrors = (0, import_react.useMemo)(() => {
		const errors = {};
		if (!template) return errors;
		template.fields.forEach((f) => {
			if (f.type === "number" && f.hardValidation && answers[f.id] !== void 0 && answers[f.id] !== "") {
				const val = Number(answers[f.id]);
				if (f.hardValidationMin !== void 0 && val < f.hardValidationMin || f.hardValidationMax !== void 0 && val > f.hardValidationMax) errors[f.id] = f.hardValidationMessage || `Valor fora do limite permitido (${f.hardValidationMin} - ${f.hardValidationMax}).`;
			}
		});
		return errors;
	}, [answers, template]);
	const hasHardErrors = Object.keys(hardValidationErrors).length > 0;
	if (!template) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Executor.tsx:52:25",
		"data-prohibitions": "[]",
		className: "p-8 text-center",
		children: "Template não encontrado."
	});
	if (!currentUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Executor.tsx:53:28",
		"data-prohibitions": "[]",
		className: "p-8 text-center",
		children: "Usuário não autenticado."
	});
	const handleChange = (fieldId, value) => setAnswers((prev) => ({
		...prev,
		[fieldId]: value
	}));
	const handleSaveDraft = () => {
		saveDraft(template.id, answers);
		toast({ title: "Rascunho salvo." });
		navigate("/");
	};
	const handleSubmit = () => {
		if (hasHardErrors) return toast({
			title: "Bloqueio de Validação",
			description: "Corrija os campos em vermelho antes de finalizar.",
			variant: "destructive"
		});
		if (template.fields.find((f) => {
			if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false;
			if (f.required && !answers[f.id]) return true;
			return false;
		})) return toast({
			title: "Campos obrigatórios",
			description: `Preencha os campos obrigatórios.`,
			variant: "destructive"
		});
		let finalLocation = answers["gps_field"] || "-23.5505, -46.6333";
		submitAudit({
			id: `aud_${generateId().substring(0, 8)}`,
			templateId: template.id,
			templateName: template.name,
			operatorId: currentUser.id,
			operatorName: currentUser.name,
			operatorAvatar: currentUser.avatar,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Concluído",
			location: finalLocation,
			answers,
			approvalStatus: "Pendente"
		});
		toast({
			title: "Auditoria Concluída",
			description: "Dados salvos e sincronizados."
		});
		navigate("/");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Executor.tsx:107:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-3xl mx-auto pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Executor.tsx:108:7",
				"data-prohibitions": "[editContent]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Executor.tsx:109:9",
					"data-prohibitions": "[editContent]",
					className: "text-2xl font-bold",
					children: template.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Executor.tsx:110:9",
					"data-prohibitions": "[editContent]",
					className: "text-muted-foreground",
					children: template.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Executor.tsx:112:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-6",
				children: template.fields.map((field) => {
					if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Executor.tsx:117:13",
						"data-prohibitions": "[]",
						className: "animate-in fade-in slide-in-from-bottom-4 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRenderer, {
							"data-uid": "src/pages/Executor.tsx:118:15",
							"data-prohibitions": "[editContent]",
							field,
							value: answers[field.id],
							onChange: (v) => handleChange(field.id, v),
							allAnswers: answers,
							error: hardValidationErrors[field.id]
						})
					}, field.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Executor.tsx:130:7",
				"data-prohibitions": "[editContent]",
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t md:left-[16rem] z-10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none",
				children: [hasHardErrors ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:132:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 text-destructive font-medium text-sm w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, {
						"data-uid": "src/pages/Executor.tsx:133:13",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					}), " Submissão Bloqueada (Regra de Negócio)"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Executor.tsx:136:11",
					"data-prohibitions": "[]",
					className: "hidden sm:block text-sm text-muted-foreground",
					children: "Tudo certo para envio."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:141:9",
					"data-prohibitions": "[]",
					className: "flex gap-4 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Executor.tsx:142:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: handleSaveDraft,
						className: "flex-1 sm:flex-none h-12 px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/pages/Executor.tsx:147:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Rascunho"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Executor.tsx:149:11",
						"data-prohibitions": "[]",
						onClick: handleSubmit,
						disabled: hasHardErrors,
						className: "flex-1 sm:flex-none gap-2 h-12 px-8 bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:bg-muted disabled:text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
							"data-uid": "src/pages/Executor.tsx:154:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), " Finalizar"]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Executor as default };

//# sourceMappingURL=Executor-_TVSZZuy.js.map