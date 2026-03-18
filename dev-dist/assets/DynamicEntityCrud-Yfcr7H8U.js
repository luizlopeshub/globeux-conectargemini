import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-BvGAN_4N.js";
import { t as Button } from "./button-4pbr5ZBd.js";
import { n as generateId } from "./utils-BK5XrqCc.js";
import { t as Pen } from "./pen-tvYOjYHo.js";
import { t as Plus } from "./plus-DUH7-UU1.js";
import { t as Trash2 } from "./trash-2-Og1H9Lex.js";
import { E as useParams, g as Input, t as useAppStore } from "./index-B4YbBch6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQ7gmVYT.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-sP8ifLBh.js";
import { t as Label } from "./label-BFlnB3Nd.js";
//#region src/pages/master-data/DynamicEntityCrud.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function DynamicEntityCrud() {
	const { slug } = useParams();
	const { entityDefs, entityRecords, saveEntityRecord, deleteEntityRecord } = useAppStore();
	const def = (0, import_react.useMemo)(() => entityDefs.find((d) => d.slug === slug), [entityDefs, slug]);
	const records = (0, import_react.useMemo)(() => entityRecords.filter((r) => r.entityId === def?.id), [entityRecords, def]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({});
	if (!def) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:34:12",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground",
		children: "Entidade não encontrada."
	});
	const handleSave = () => {
		saveEntityRecord({
			id: !form.id ? `rec_${generateId().substring(0, 8)}` : form.id,
			entityId: def.id,
			...form
		});
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:48:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:49:7",
				"data-prohibitions": "[editContent]",
				className: "flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:50:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:51:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: def.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:52:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerenciamento dinâmico de registros."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:54:9",
					"data-prohibitions": "[]",
					onClick: () => {
						setForm({});
						setOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:60:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 mr-2"
					}), " Novo Registro"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:64:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:65:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:66:11",
						"data-prohibitions": "[editContent]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:67:13",
							"data-prohibitions": "[editContent]",
							children: [def.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:69:17",
								"data-prohibitions": "[editContent]",
								children: f.name
							}, f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:71:15",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Ações"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:74:11",
						"data-prohibitions": "[editContent]",
						children: [records.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:76:15",
							"data-prohibitions": "[editContent]",
							children: [def.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:78:19",
								"data-prohibitions": "[editContent]",
								children: row[f.id] || "-"
							}, f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:80:17",
								"data-prohibitions": "[]",
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:81:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => {
										setForm(row);
										setOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
										"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:89:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-muted-foreground"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:91:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => deleteEntityRecord(row.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:92:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-destructive"
									})
								})]
							})]
						}, row.id)), records.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:98:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:99:17",
								"data-prohibitions": "[]",
								colSpan: def.fields.length + 1,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhum registro encontrado."
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:111:7",
				"data-prohibitions": "[editContent]",
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:112:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:113:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:114:13",
								"data-prohibitions": "[editContent]",
								children: [
									form.id ? "Editar" : "Novo",
									" ",
									def.name
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:118:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1",
							children: def.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:120:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:121:17",
									"data-prohibitions": "[editContent]",
									children: f.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:122:17",
									"data-prohibitions": "[editContent]",
									type: f.type === "number" ? "number" : f.type === "date" ? "date" : "text",
									value: form[f.id] || "",
									onChange: (e) => setForm({
										...form,
										[f.id]: e.target.value
									})
								})]
							}, f.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:130:11",
							"data-prohibitions": "[]",
							className: "flex justify-end gap-2 pt-4 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:131:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/master-data/DynamicEntityCrud.tsx:134:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								children: "Salvar Alterações"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { DynamicEntityCrud as default };

//# sourceMappingURL=DynamicEntityCrud-Yfcr7H8U.js.map