import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import { f as createContextScope, i as Presence, m as toast, n as useId, p as composeEventHandlers, r as useControllableState, s as Primitive } from "./dist-BxEJpsLU.js";
import { o as useComposedRefs, t as Button } from "./button-4pbr5ZBd.js";
import { n as useSize, t as useDirection } from "./dist-D7YLabLT.js";
import "./es2015-CJmGy-ee.js";
import { n as generateId, r as createLucideIcon, t as cn } from "./utils-BK5XrqCc.js";
import { n as Save, r as Camera, t as Checkbox } from "./checkbox-_sFBlQb-.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, o as ShieldAlert, r as SelectItem, s as Plus, t as Select } from "./select-D_RAklpV.js";
import { t as FileText } from "./file-text-Bknx9YaS.js";
import { t as MapPin } from "./map-pin-BX2PMi1g.js";
import { a as Item, g as Input, o as Root$1, s as createRovingFocusGroupScope, t as useAppStore } from "./index-DAJbD8tT.js";
import { t as Card } from "./card-D2pAmwtD.js";
import { n as Label, t as usePrevious } from "./dist-CSKhcd_F.js";
var Calculator = createLucideIcon("calculator", [
	["rect", {
		width: "16",
		height: "20",
		x: "4",
		y: "2",
		rx: "2",
		key: "1nb95v"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "6",
		y2: "6",
		key: "x4nwl0"
	}],
	["line", {
		x1: "16",
		x2: "16",
		y1: "14",
		y2: "18",
		key: "wjye3r"
	}],
	["path", {
		d: "M16 10h.01",
		key: "1m94wz"
	}],
	["path", {
		d: "M12 10h.01",
		key: "1nrarc"
	}],
	["path", {
		d: "M8 10h.01",
		key: "19clt8"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}]
]);
var GripVertical = createLucideIcon("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]);
var Hash = createLucideIcon("hash", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "9",
		y2: "9",
		key: "4lhtct"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "15",
		y2: "15",
		key: "vyu0kd"
	}],
	["line", {
		x1: "10",
		x2: "8",
		y1: "3",
		y2: "21",
		key: "1ggp8o"
	}],
	["line", {
		x1: "16",
		x2: "14",
		y1: "3",
		y2: "21",
		key: "weycgp"
	}]
]);
var ListFilter = createLucideIcon("list-filter", [
	["path", {
		d: "M2 5h20",
		key: "1fs1ex"
	}],
	["path", {
		d: "M6 12h12",
		key: "8npq4p"
	}],
	["path", {
		d: "M9 19h6",
		key: "456am0"
	}]
]);
var Signature = createLucideIcon("signature", [["path", {
	d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284",
	key: "y32ogt"
}], ["path", {
	d: "M3 21h18",
	key: "itz85i"
}]]);
var SquareCheckBig = createLucideIcon("square-check-big", [["path", {
	d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
	key: "2acyp4"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
var Type = createLucideIcon("type", [
	["path", {
		d: "M12 4v16",
		key: "1654pz"
	}],
	["path", {
		d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
		key: "e0r10z"
	}],
	["path", {
		d: "M9 20h6",
		key: "s66wpe"
	}]
]);
//#endregion
//#region src/components/constructor/Toolbox.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Toolbox({ onAdd }) {
	const tools = [
		{
			type: "text",
			icon: Type,
			label: "Texto Curto"
		},
		{
			type: "number",
			icon: Hash,
			label: "Número"
		},
		{
			type: "radio",
			icon: ListFilter,
			label: "Seleção Única"
		},
		{
			type: "checkbox",
			icon: SquareCheckBig,
			label: "Múltipla Escolha"
		},
		{
			type: "gps",
			icon: MapPin,
			label: "Localização GPS"
		},
		{
			type: "camera",
			icon: Camera,
			label: "Foto / Câmera"
		},
		{
			type: "signature",
			icon: Signature,
			label: "Assinatura"
		},
		{
			type: "calculation",
			icon: Calculator,
			label: "Cálculo"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/constructor/Toolbox.tsx:27:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-2 pb-6",
		children: tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			"data-uid": "src/components/constructor/Toolbox.tsx:29:9",
			"data-prohibitions": "[editContent]",
			variant: "outline",
			className: "w-full justify-start gap-3 bg-background hover:bg-muted",
			onClick: () => onAdd(tool.type),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tool.icon, {
				"data-uid": "src/components/constructor/Toolbox.tsx:35:11",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4 text-primary"
			}), tool.label]
		}, tool.type))
	});
}
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_e3738c514c10df2ef7e24af5ee461853/node_modules/@radix-ui/react-switch/dist/index.mjs
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
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
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
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
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/switch.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		"data-uid": "src/components/ui/switch.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
	})
}));
Switch.displayName = Root.displayName;
//#endregion
//#region src/components/constructor/PropertiesPanel.tsx
function PropertiesPanel({ activeField, fields, handleUpdateField }) {
	const numericFields = fields.filter((f) => f.id !== activeField.id && f.type === "number");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/constructor/PropertiesPanel.tsx:24:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/constructor/PropertiesPanel.tsx:25:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:26:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:27:11",
							"data-prohibitions": "[]",
							children: "Label da Pergunta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:28:11",
							"data-prohibitions": "[editContent]",
							value: activeField.label,
							onChange: (e) => handleUpdateField(activeField.id, { label: e.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:33:9",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:34:11",
							"data-prohibitions": "[]",
							children: "Obrigatório?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:35:11",
							"data-prohibitions": "[editContent]",
							checked: activeField.required,
							onCheckedChange: (c) => handleUpdateField(activeField.id, { required: c })
						})]
					}),
					(activeField.type === "radio" || activeField.type === "checkbox") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:42:11",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:43:13",
							"data-prohibitions": "[]",
							children: "Opções (separadas por vírgula)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:44:13",
							"data-prohibitions": "[editContent]",
							value: activeField.options || "",
							onChange: (e) => handleUpdateField(activeField.id, { options: e.target.value }),
							placeholder: "Ex: Sim, Não, N/A"
						})]
					}),
					activeField.type === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:53:11",
						"data-prohibitions": "[editContent]",
						className: "pt-4 border-t space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:54:13",
							"data-prohibitions": "[]",
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:55:15",
								"data-prohibitions": "[]",
								className: "text-destructive font-semibold",
								children: "Hard Validation (Bloqueio)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:56:15",
								"data-prohibitions": "[editContent]",
								checked: activeField.hardValidation,
								onCheckedChange: (c) => handleUpdateField(activeField.id, { hardValidation: c })
							})]
						}), activeField.hardValidation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:62:15",
							"data-prohibitions": "[]",
							className: "space-y-4 bg-red-50 p-3 rounded-md border border-red-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:63:17",
								"data-prohibitions": "[]",
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:64:19",
									"data-prohibitions": "[]",
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:65:21",
										"data-prohibitions": "[]",
										className: "text-xs",
										children: "Valor Mínimo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:66:21",
										"data-prohibitions": "[editContent]",
										type: "number",
										value: activeField.hardValidationMin ?? "",
										onChange: (e) => handleUpdateField(activeField.id, { hardValidationMin: Number(e.target.value) })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:76:19",
									"data-prohibitions": "[]",
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:77:21",
										"data-prohibitions": "[]",
										className: "text-xs",
										children: "Valor Máximo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:78:21",
										"data-prohibitions": "[editContent]",
										type: "number",
										value: activeField.hardValidationMax ?? "",
										onChange: (e) => handleUpdateField(activeField.id, { hardValidationMax: Number(e.target.value) })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:89:17",
								"data-prohibitions": "[]",
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:90:19",
									"data-prohibitions": "[]",
									className: "text-xs",
									children: "Mensagem de Erro Personalizada"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:91:19",
									"data-prohibitions": "[editContent]",
									value: activeField.hardValidationMessage || "",
									onChange: (e) => handleUpdateField(activeField.id, { hardValidationMessage: e.target.value }),
									placeholder: "Ex: Valor fora do limite permitido."
								})]
							})]
						})]
					}),
					activeField.type === "calculation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:105:11",
						"data-prohibitions": "[editContent]",
						className: "pt-4 border-t space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:106:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:107:15",
								"data-prohibitions": "[]",
								children: "Operação"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:108:15",
								"data-prohibitions": "[]",
								value: activeField.calcOperation || "sum",
								onValueChange: (val) => handleUpdateField(activeField.id, { calcOperation: val }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:114:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:115:19",
										"data-prohibitions": "[editContent]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:117:17",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:118:19",
										"data-prohibitions": "[]",
										value: "sum",
										children: "Soma (Sum)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:119:19",
										"data-prohibitions": "[]",
										value: "average",
										children: "Média (Average)"
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:123:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:124:15",
								"data-prohibitions": "[]",
								children: "Campos Fonte (Multi-seleção)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:125:15",
								"data-prohibitions": "[editContent]",
								className: "border rounded-md p-2 max-h-32 overflow-y-auto space-y-2 bg-background",
								children: numericFields.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/constructor/PropertiesPanel.tsx:127:19",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground p-2",
									children: "Nenhum campo numérico disponível."
								}) : numericFields.map((f) => {
									const isSelected = activeField.calcSourceFields?.includes(f.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/constructor/PropertiesPanel.tsx:134:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-center space-x-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/components/constructor/PropertiesPanel.tsx:135:25",
											"data-prohibitions": "[editContent]",
											id: `calc-${f.id}`,
											checked: isSelected,
											onCheckedChange: (c) => {
												const current = activeField.calcSourceFields || [];
												handleUpdateField(activeField.id, { calcSourceFields: c ? [...current, f.id] : current.filter((id) => id !== f.id) });
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											"data-uid": "src/components/constructor/PropertiesPanel.tsx:147:25",
											"data-prohibitions": "[editContent]",
											htmlFor: `calc-${f.id}`,
											className: "text-sm font-medium leading-none cursor-pointer truncate",
											children: f.label
										})]
									}, f.id);
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/constructor/PropertiesPanel.tsx:163:7",
				"data-prohibitions": "[editContent]",
				className: "pt-4 border-t space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/constructor/PropertiesPanel.tsx:164:9",
					"data-prohibitions": "[]",
					className: "font-medium text-sm text-primary",
					children: "Lógica de Visibilidade (Árvore)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/constructor/PropertiesPanel.tsx:165:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/constructor/PropertiesPanel.tsx:166:11",
						"data-prohibitions": "[editContent]",
						value: activeField.logicDependsOn || "none",
						onValueChange: (val) => handleUpdateField(activeField.id, { logicDependsOn: val === "none" ? void 0 : val }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:174:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:175:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Selecione..."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/constructor/PropertiesPanel.tsx:177:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:178:15",
								"data-prohibitions": "[]",
								value: "none",
								children: "Sempre visível"
							}), fields.filter((f) => f.id !== activeField.id).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								"data-uid": "src/components/constructor/PropertiesPanel.tsx:182:19",
								"data-prohibitions": "[editContent]",
								value: f.id,
								children: [
									f.label,
									" (",
									f.id,
									")"
								]
							}, f.id))]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/constructor/PropertiesPanel.tsx:190:7",
				"data-prohibitions": "[editContent]",
				className: "pt-4 border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-uid": "src/components/constructor/PropertiesPanel.tsx:191:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs text-muted-foreground font-mono bg-muted p-2 rounded",
					children: ["ID: ", activeField.id]
				})
			})
		]
	});
}
//#endregion
//#region src/components/constructor/ConfigPanel.tsx
function ConfigPanel({ assignedUsers, assignedDepartments, onChange }) {
	const { users } = useAppStore();
	const DEPARTMENTS = [
		"Recebimento",
		"Expedição",
		"Químicos",
		"Qualidade"
	];
	const operators = users.filter((u) => u.role === "operator");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/constructor/ConfigPanel.tsx:17:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/constructor/ConfigPanel.tsx:18:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:19:9",
						"data-prohibitions": "[]",
						className: "font-medium text-sm",
						children: "Atribuir a Departamentos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:20:9",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground mb-2",
						children: "Qualquer operador nestes departamentos verá o checklist."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:23:9",
						"data-prohibitions": "[editContent]",
						className: "border rounded-md p-2 space-y-2 bg-background",
						children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/ConfigPanel.tsx:25:13",
							"data-prohibitions": "[editContent]",
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								"data-uid": "src/components/constructor/ConfigPanel.tsx:26:15",
								"data-prohibitions": "[editContent]",
								id: `dept-${d}`,
								checked: assignedDepartments.includes(d),
								onCheckedChange: (c) => {
									onChange(assignedUsers, c ? [...assignedDepartments, d] : assignedDepartments.filter((id) => id !== d));
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/components/constructor/ConfigPanel.tsx:36:15",
								"data-prohibitions": "[editContent]",
								htmlFor: `dept-${d}`,
								className: "text-sm font-medium leading-none cursor-pointer",
								children: d
							})]
						}, d))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/constructor/ConfigPanel.tsx:47:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-2 border-t pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:48:9",
						"data-prohibitions": "[]",
						className: "font-medium text-sm",
						children: "Atribuir a Usuários Específicos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:49:9",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground mb-2",
						children: "Apenas estes operadores específicos verão o checklist."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:52:9",
						"data-prohibitions": "[editContent]",
						className: "border rounded-md p-2 max-h-48 overflow-y-auto space-y-2 bg-background",
						children: operators.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/constructor/ConfigPanel.tsx:54:13",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground p-2",
							children: "Nenhum operador encontrado."
						}) : operators.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/constructor/ConfigPanel.tsx:57:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								"data-uid": "src/components/constructor/ConfigPanel.tsx:58:17",
								"data-prohibitions": "[editContent]",
								id: `usr-${u.id}`,
								checked: assignedUsers.includes(u.id),
								onCheckedChange: (c) => {
									onChange(c ? [...assignedUsers, u.id] : assignedUsers.filter((id) => id !== u.id), assignedDepartments);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								"data-uid": "src/components/constructor/ConfigPanel.tsx:68:17",
								"data-prohibitions": "[editContent]",
								htmlFor: `usr-${u.id}`,
								className: "text-sm font-medium leading-none cursor-pointer truncate",
								children: [
									u.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/constructor/ConfigPanel.tsx:73:19",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground font-normal text-xs",
										children: [
											"(",
											u.department || "Sem depto",
											")"
										]
									})
								]
							})]
						}, u.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-uid": "src/components/constructor/ConfigPanel.tsx:82:7",
				"data-prohibitions": "[]",
				className: "text-xs bg-blue-50 text-blue-800 p-3 rounded-md",
				children: [
					"Se nenhum departamento ou usuário for selecionado, o checklist ficará disponível para",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						"data-uid": "src/components/constructor/ConfigPanel.tsx:84:9",
						"data-prohibitions": "[]",
						children: "todos os operadores"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
//#region ../../cache/modules/gestao-de-auditorias-logisticas-6a505/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_2ad0945e3cb98dc5bbfaaf29c105e977/node_modules/@radix-ui/react-tabs/dist/index.mjs
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	"data-uid": "src/components/ui/tabs.tsx:12:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	"data-uid": "src/components/ui/tabs.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	"data-uid": "src/components/ui/tabs.tsx:42:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
//#endregion
//#region src/pages/Constructor.tsx
function Constructor() {
	const { templates, addTemplate, updateTemplate, currentUser } = useAppStore();
	const [editingTemplateId, setEditingTemplateId] = (0, import_react.useState)(null);
	const [templateName, setTemplateName] = (0, import_react.useState)("Novo Checklist");
	const [fields, setFields] = (0, import_react.useState)([]);
	const [assignedUsers, setAssignedUsers] = (0, import_react.useState)([]);
	const [assignedDepartments, setAssignedDepartments] = (0, import_react.useState)([]);
	const [activeFieldId, setActiveFieldId] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("toolbox");
	(0, import_react.useEffect)(() => {
		if (!editingTemplateId && templates.length > 0 && fields.length === 0 && templateName === "Novo Checklist") loadTemplate(templates[0]);
	}, [
		templates,
		editingTemplateId,
		fields.length,
		templateName
	]);
	if (currentUser?.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Constructor.tsx:38:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground flex flex-col items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
			"data-uid": "src/pages/Constructor.tsx:39:9",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 text-destructive"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/Constructor.tsx:40:9",
			"data-prohibitions": "[]",
			children: "Acesso negado. Apenas administradores podem acessar o Construtor."
		})]
	});
	const loadTemplate = (t) => {
		setEditingTemplateId(t.id);
		setTemplateName(t.name);
		setFields(t.fields);
		setAssignedUsers(t.assignedUsers || []);
		setAssignedDepartments(t.assignedDepartments || []);
		setActiveFieldId(null);
		setActiveTab("toolbox");
	};
	const createNewTemplate = () => {
		setEditingTemplateId(null);
		setTemplateName("Novo Checklist");
		setFields([]);
		setAssignedUsers([]);
		setAssignedDepartments([]);
		setActiveFieldId(null);
		setActiveTab("toolbox");
	};
	const handleAddField = (type) => {
		const newField = {
			id: `f_${generateId().substring(0, 6)}`,
			type,
			label: `Novo Campo (${type})`,
			required: false
		};
		setFields([...fields, newField]);
		setActiveFieldId(newField.id);
		setActiveTab("properties");
	};
	const handleSave = () => {
		if (!templateName || fields.length === 0) return toast({
			title: "Erro",
			description: "Adicione um nome e pelo menos um campo.",
			variant: "destructive"
		});
		const tmplData = {
			name: templateName,
			fields,
			assignedUsers,
			assignedDepartments
		};
		if (editingTemplateId) {
			updateTemplate({
				...templates.find((t) => t.id === editingTemplateId),
				...tmplData
			});
			toast({
				title: "Sucesso",
				description: "Template atualizado!"
			});
		} else {
			const newTemplate = {
				id: `tmpl_${generateId()}`,
				description: "Gerado pelo construtor.",
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				...tmplData
			};
			addTemplate(newTemplate);
			setEditingTemplateId(newTemplate.id);
			toast({
				title: "Sucesso",
				description: "Novo template salvo!"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Constructor.tsx:102:5",
		"data-prohibitions": "[editContent]",
		className: "flex h-[calc(100vh-8rem)] gap-4 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Constructor.tsx:103:7",
				"data-prohibitions": "[editContent]",
				className: "w-64 bg-card border rounded-lg p-4 flex flex-col gap-4 shadow-sm overflow-hidden shrink-0 hidden md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Constructor.tsx:104:9",
						"data-prohibitions": "[]",
						onClick: createNewTemplate,
						className: "w-full gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/Constructor.tsx:105:11",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), " Novo Checklist"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Constructor.tsx:107:9",
						"data-prohibitions": "[]",
						className: "font-semibold text-sm text-muted-foreground mt-2 shrink-0",
						children: "Meus Checklists"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Constructor.tsx:110:9",
						"data-prohibitions": "[editContent]",
						className: "flex-1 overflow-y-auto space-y-2 -mr-2 pr-2",
						children: templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/Constructor.tsx:112:13",
							"data-prohibitions": "[editContent]",
							className: `p-3 cursor-pointer hover:border-primary ${editingTemplateId === t.id ? "border-primary bg-primary/5" : ""}`,
							onClick: () => loadTemplate(t),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Constructor.tsx:117:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-sm truncate flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/pages/Constructor.tsx:118:17",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 text-primary shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Constructor.tsx:119:17",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									children: t.name
								})]
							})
						}, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Constructor.tsx:126:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col gap-4 overflow-hidden bg-muted/30 p-4 rounded-lg border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Constructor.tsx:127:9",
					"data-prohibitions": "[editContent]",
					className: "flex justify-between items-center bg-card p-3 rounded-md shadow-sm border shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/pages/Constructor.tsx:128:11",
						"data-prohibitions": "[editContent]",
						value: templateName,
						onChange: (e) => setTemplateName(e.target.value),
						className: "max-w-xs font-semibold text-lg border-none shadow-none focus-visible:ring-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Constructor.tsx:133:11",
						"data-prohibitions": "[editContent]",
						onClick: handleSave,
						className: "gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/Constructor.tsx:134:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}),
							" Salvar ",
							editingTemplateId ? "Alterações" : "Template"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Constructor.tsx:137:9",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-y-auto space-y-3 p-1",
					children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/Constructor.tsx:139:13",
						"data-prohibitions": "[editContent]",
						className: `p-4 cursor-pointer transition-all ${activeFieldId === f.id ? "ring-2 ring-primary border-transparent" : "hover:border-primary/50"}`,
						onClick: () => {
							setActiveFieldId(f.id);
							setActiveTab("properties");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Constructor.tsx:147:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
									"data-uid": "src/pages/Constructor.tsx:148:17",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-muted-foreground mt-1 cursor-move shrink-0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Constructor.tsx:149:17",
									"data-prohibitions": "[editContent]",
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Constructor.tsx:150:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium flex items-center gap-2 truncate",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Constructor.tsx:151:21",
												"data-prohibitions": "[editContent]",
												className: "truncate",
												children: f.label
											}),
											f.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Constructor.tsx:152:36",
												"data-prohibitions": "[]",
												className: "text-destructive shrink-0",
												children: "*"
											}),
											f.hardValidation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Constructor.tsx:154:23",
												"data-prohibitions": "[]",
												className: "text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold",
												children: "HARD LOCK"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Constructor.tsx:159:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground mt-1 uppercase tracking-wider",
										children: f.type
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Constructor.tsx:163:17",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: (e) => {
										e.stopPropagation();
										setFields(fields.filter((x) => x.id !== f.id));
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/pages/Constructor.tsx:171:19",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-destructive"
									})
								})
							]
						})
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Constructor.tsx:179:7",
				"data-prohibitions": "[editContent]",
				className: "w-80 bg-card border rounded-lg p-4 overflow-hidden shadow-sm flex flex-col shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/pages/Constructor.tsx:180:9",
					"data-prohibitions": "[editContent]",
					value: activeTab,
					onValueChange: setActiveTab,
					className: "flex-1 flex flex-col overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/Constructor.tsx:185:11",
							"data-prohibitions": "[]",
							className: "w-full grid grid-cols-3 shrink-0 h-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Constructor.tsx:186:13",
									"data-prohibitions": "[]",
									value: "toolbox",
									className: "text-xs px-1",
									children: "Comps"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Constructor.tsx:189:13",
									"data-prohibitions": "[]",
									value: "properties",
									disabled: !activeFieldId,
									className: "text-xs px-1",
									children: "Props"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Constructor.tsx:192:13",
									"data-prohibitions": "[]",
									value: "config",
									className: "text-xs px-1",
									children: "Config"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/Constructor.tsx:196:11",
							"data-prohibitions": "[]",
							value: "toolbox",
							className: "flex-1 overflow-y-auto mt-4 pr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbox, {
								"data-uid": "src/pages/Constructor.tsx:197:13",
								"data-prohibitions": "[editContent]",
								onAdd: handleAddField
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/Constructor.tsx:199:11",
							"data-prohibitions": "[editContent]",
							value: "properties",
							className: "flex-1 overflow-y-auto mt-4 pr-2",
							children: activeFieldId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertiesPanel, {
								"data-uid": "src/pages/Constructor.tsx:201:15",
								"data-prohibitions": "[editContent]",
								activeField: fields.find((f) => f.id === activeFieldId),
								fields,
								handleUpdateField: (id, up) => setFields(fields.map((f) => f.id === id ? {
									...f,
									...up
								} : f))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Constructor.tsx:209:15",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Selecione um campo."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/Constructor.tsx:212:11",
							"data-prohibitions": "[]",
							value: "config",
							className: "flex-1 overflow-y-auto mt-4 pr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigPanel, {
								"data-uid": "src/pages/Constructor.tsx:213:13",
								"data-prohibitions": "[editContent]",
								assignedUsers,
								assignedDepartments,
								onChange: (u, d) => {
									setAssignedUsers(u);
									setAssignedDepartments(d);
								}
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Constructor as default };

//# sourceMappingURL=Constructor-Dl9KEcz4.js.map