import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import { a as Primitive$1, b as composeEventHandlers, m as Primitive, s as useControllableState, y as createContextScope } from "./es2015-BvGAN_4N.js";
import { o as useComposedRefs, t as Button } from "./button-4pbr5ZBd.js";
import { s as useSize, t as useDirection } from "./dist-BkrhYOXl.js";
import { t as Presence } from "./dist-ClK7ZbbO.js";
import { n as generateId, r as createLucideIcon, t as cn } from "./utils-BK5XrqCc.js";
import { n as Camera, t as Checkbox } from "./checkbox-D8dgQHpj.js";
import { o as usePrevious } from "./select-hqG6fXx6.js";
import { t as SmartLookup } from "./SmartLookup-D8ZWINTO.js";
import { t as MapPin } from "./map-pin-DNbKaYrd.js";
import { t as createContextScope$1 } from "./dist-BwmCMxpo.js";
import { T as useParams, a as Item, b as Circle, g as Input, o as Root$1, s as createRovingFocusGroupScope, t as useAppStore, w as useNavigate, x as toast } from "./index-BdkbARb4.js";
import { n as CardContent, t as Card } from "./card--sks-GK7.js";
import "./dialog-DNmFlxFU.js";
import { t as Label } from "./label-B0O5-18s.js";
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
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
var INDICATOR_NAME$1 = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME$1, __scopeRadio);
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
RadioIndicator.displayName = INDICATOR_NAME$1;
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
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
var Indicator$1 = RadioGroupIndicator;
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator$1, {
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
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-progress@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_7258c0b550570cef5cd6f2d2227aa6b9/node_modules/@radix-ui/react-progress/dist/index.mjs
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope$1(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
	if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
	const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
	if (valueProp !== null && !isValidValueNumber(valueProp, max)) console.error(getInvalidValueError(`${valueProp}`, "Progress"));
	const value = isValidValueNumber(valueProp, max) ? valueProp : null;
	const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
		scope: __scopeProgress,
		value,
		max,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
			"aria-valuemax": max,
			"aria-valuemin": 0,
			"aria-valuenow": isNumber(value) ? value : void 0,
			"aria-valuetext": valueLabel,
			role: "progressbar",
			"data-state": getProgressState(value, max),
			"data-value": value ?? void 0,
			"data-max": max,
			...progressProps,
			ref: forwardedRef
		})
	});
});
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, ...indicatorProps } = props;
	const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		"data-state": getProgressState(context.value, context.max),
		"data-value": context.value ?? void 0,
		"data-max": context.max,
		...indicatorProps,
		ref: forwardedRef
	});
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
	return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
	return typeof value === "number";
}
function isValidMaxNumber(max) {
	return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
	return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
	return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
	return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
//#endregion
//#region src/components/ui/progress.tsx
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/progress.tsx:10:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		"data-uid": "src/components/ui/progress.tsx:15:5",
		"data-prohibitions": "[editContent]",
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
//#endregion
//#region src/pages/Executor.tsx
function Executor() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { templates, drafts, saveDraft, submitAudit, currentUser } = useAppStore();
	const template = templates.find((t) => t.id === id);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const [savingStatus, setSavingStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (id && drafts[id]) {
			setAnswers(drafts[id].answers || {});
			setCurrentStep(drafts[id].step || 0);
			toast({ description: "Rascunho recuperado. Retornando ao ponto salvo." });
		}
	}, [id, drafts]);
	const visibleBlocks = (0, import_react.useMemo)(() => {
		if (!template?.blocks) return [];
		return template.blocks.filter((b) => {
			if (!b.logicDependsOn) return true;
			return answers[b.logicDependsOn] === b.logicValue;
		});
	}, [template, answers]);
	(0, import_react.useEffect)(() => {
		if (visibleBlocks.length > 0 && currentStep >= visibleBlocks.length) setCurrentStep(Math.max(0, visibleBlocks.length - 1));
	}, [visibleBlocks.length, currentStep]);
	(0, import_react.useEffect)(() => {
		if (template && Object.keys(answers).length > 0) {
			setSavingStatus("Salvando rascunho...");
			const timer = setTimeout(() => {
				saveDraft(template.id, {
					answers,
					step: currentStep
				});
				setSavingStatus("Rascunho salvo automaticamente");
			}, 800);
			return () => clearTimeout(timer);
		}
	}, [
		answers,
		currentStep,
		template,
		saveDraft
	]);
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
		"data-uid": "src/pages/Executor.tsx:81:25",
		"data-prohibitions": "[]",
		className: "p-8 text-center",
		children: "Template não encontrado."
	});
	if (!currentUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Executor.tsx:82:28",
		"data-prohibitions": "[]",
		className: "p-8 text-center",
		children: "Usuário não autenticado."
	});
	const currentBlock = visibleBlocks[currentStep];
	const currentFields = template.fields.filter((f) => f.blockId === currentBlock?.id);
	const progressPercent = visibleBlocks.length ? (currentStep + 1) / visibleBlocks.length * 100 : 0;
	const isLastStep = currentStep === visibleBlocks.length - 1;
	const validateCurrentBlock = () => {
		if (hasHardErrors) {
			toast({
				title: "Bloqueio de Validação",
				description: "Corrija os campos em vermelho antes de prosseguir.",
				variant: "destructive"
			});
			return false;
		}
		let isValid = true;
		for (const f of currentFields) {
			if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) continue;
			if (f.required && !answers[f.id]) {
				toast({
					variant: "destructive",
					description: `Preencha o campo obrigatório: ${f.label}`
				});
				isValid = false;
				break;
			}
		}
		return isValid;
	};
	const handleNext = () => {
		if (!validateCurrentBlock()) return;
		setCurrentStep((s) => s + 1);
	};
	const handlePrev = () => {
		setCurrentStep((s) => Math.max(0, s - 1));
	};
	const handleSubmit = () => {
		if (!validateCurrentBlock()) return;
		if (template.fields.find((f) => {
			if (f.logicDependsOn && answers[f.logicDependsOn] !== f.logicValue) return false;
			if (!visibleBlocks.some((b) => b.id === f.blockId)) return false;
			if (f.required && !answers[f.id]) return true;
			return false;
		})) return toast({
			title: "Campos obrigatórios",
			description: `Existem campos obrigatórios não preenchidos em blocos anteriores.`,
			variant: "destructive"
		});
		submitAudit({
			id: `aud_${generateId().substring(0, 8)}`,
			templateId: template.id,
			templateName: template.name,
			operatorId: currentUser.id,
			operatorName: currentUser.name,
			operatorAvatar: currentUser.avatar,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Concluído",
			location: answers["gps_field"] || "-23.5505, -46.6333",
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
		"data-uid": "src/pages/Executor.tsx:161:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-3xl mx-auto pb-28 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Executor.tsx:162:7",
				"data-prohibitions": "[editContent]",
				className: "mb-8 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:163:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Executor.tsx:164:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: template.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Executor.tsx:165:11",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground",
						children: template.description
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:167:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Executor.tsx:168:11",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between text-sm font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/pages/Executor.tsx:169:13",
							"data-prohibitions": "[editContent]",
							children: [
								"Passo ",
								currentStep + 1,
								" de ",
								visibleBlocks.length || 1
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/pages/Executor.tsx:172:13",
							"data-prohibitions": "[editContent]",
							className: "text-primary",
							children: [Math.round(progressPercent), "% Concluído"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						"data-uid": "src/pages/Executor.tsx:174:11",
						"data-prohibitions": "[editContent]",
						value: progressPercent,
						className: "h-2"
					})]
				})]
			}),
			currentBlock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Executor.tsx:179:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/Executor.tsx:180:11",
						"data-prohibitions": "[editContent]",
						className: "text-xl font-semibold border-b pb-2 text-primary",
						children: currentBlock.name
					}),
					currentFields.map((field) => {
						if (field.logicDependsOn && answers[field.logicDependsOn] !== field.logicValue) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRenderer, {
							"data-uid": "src/pages/Executor.tsx:185:15",
							"data-prohibitions": "[editContent]",
							field,
							value: answers[field.id],
							onChange: (v) => setAnswers((p) => ({
								...p,
								[field.id]: v
							})),
							allAnswers: answers,
							error: hardValidationErrors[field.id]
						}, field.id);
					}),
					currentFields.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Executor.tsx:196:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground italic p-4 text-center",
						children: "Nenhum campo neste bloco."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Executor.tsx:203:7",
				"data-prohibitions": "[editContent]",
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t md:left-[16rem] z-10 flex flex-col shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-none",
				children: [hasHardErrors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:205:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 text-destructive font-medium text-sm w-full mx-auto max-w-3xl mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, {
						"data-uid": "src/pages/Executor.tsx:206:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), " Submissão Bloqueada (Regra de Negócio)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Executor.tsx:209:9",
					"data-prohibitions": "[editContent]",
					className: "flex justify-between items-center max-w-3xl w-full mx-auto gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Executor.tsx:210:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: handlePrev,
							disabled: currentStep === 0,
							className: "w-32 h-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/Executor.tsx:216:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Voltar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Executor.tsx:219:11",
							"data-prohibitions": "[editContent]",
							className: "hidden sm:flex items-center text-xs text-muted-foreground font-medium flex-1 justify-center",
							children: [savingStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/pages/Executor.tsx:220:30",
								"data-prohibitions": "[editContent]",
								className: "h-3 w-3 text-emerald-500 mr-1"
							}), savingStatus]
						}),
						isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Executor.tsx:225:13",
							"data-prohibitions": "[]",
							onClick: handleSubmit,
							disabled: hasHardErrors,
							className: "w-48 h-12 bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:bg-muted disabled:text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
								"data-uid": "src/pages/Executor.tsx:230:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Finalizar e Gerar PDF"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Executor.tsx:233:13",
							"data-prohibitions": "[]",
							onClick: handleNext,
							disabled: hasHardErrors,
							className: "w-32 h-12",
							children: ["Próximo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"data-uid": "src/pages/Executor.tsx:234:23",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 ml-2"
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Executor as default };

//# sourceMappingURL=Executor-Dz52gJZi.js.map