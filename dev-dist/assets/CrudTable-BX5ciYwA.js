import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import { t as Button } from "./button-BhsDJ-bV.js";
import { n as generateId, r as createLucideIcon } from "./utils-DeT4lGOf.js";
import { t as Plus } from "./plus-CPNzQQEA.js";
import { t as Trash2 } from "./trash-2-BKHsVYkU.js";
import { g as Input, t as useAppStore } from "./index-5LHpi1CV.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D0JISnoT.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-BJcZ5kRc.js";
import { t as Label } from "./label-DYYDBAuO.js";
var Pen = createLucideIcon("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
//#endregion
//#region src/components/master-data/CrudTable.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CrudTable({ title, entityType, columns }) {
	const store = useAppStore();
	const data = store[entityType];
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setFormData] = (0, import_react.useState)({});
	const handleSave = () => {
		if (form.id) store.updateEntity(entityType, form);
		else store.addEntity(entityType, {
			...form,
			id: `md_${generateId().substring(0, 6)}`
		});
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/master-data/CrudTable.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/master-data/CrudTable.tsx:41:7",
				"data-prohibitions": "[editContent]",
				className: "flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/master-data/CrudTable.tsx:42:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/components/master-data/CrudTable.tsx:43:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/master-data/CrudTable.tsx:44:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerencie o cadastro mestre para checklists dinâmicos."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/master-data/CrudTable.tsx:48:9",
					"data-prohibitions": "[]",
					onClick: () => {
						setFormData({});
						setOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/components/master-data/CrudTable.tsx:54:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 mr-2"
					}), " Novo Cadastro"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/master-data/CrudTable.tsx:57:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/master-data/CrudTable.tsx:58:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/master-data/CrudTable.tsx:59:11",
						"data-prohibitions": "[editContent]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/master-data/CrudTable.tsx:60:13",
							"data-prohibitions": "[editContent]",
							children: [columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/master-data/CrudTable.tsx:62:17",
								"data-prohibitions": "[editContent]",
								children: c.label
							}, c.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/master-data/CrudTable.tsx:64:15",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Ações"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/components/master-data/CrudTable.tsx:67:11",
						"data-prohibitions": "[editContent]",
						children: [data.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/master-data/CrudTable.tsx:69:15",
							"data-prohibitions": "[editContent]",
							children: [columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/master-data/CrudTable.tsx:71:19",
								"data-prohibitions": "[editContent]",
								children: row[c.key]
							}, c.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/components/master-data/CrudTable.tsx:73:17",
								"data-prohibitions": "[]",
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/master-data/CrudTable.tsx:74:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => {
										setFormData(row);
										setOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
										"data-uid": "src/components/master-data/CrudTable.tsx:82:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-muted-foreground"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/master-data/CrudTable.tsx:84:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => store.deleteEntity(entityType, row.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/components/master-data/CrudTable.tsx:89:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-destructive"
									})
								})]
							})]
						}, row.id)), data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/master-data/CrudTable.tsx:95:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/master-data/CrudTable.tsx:96:17",
								"data-prohibitions": "[]",
								colSpan: columns.length + 1,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhum registro encontrado."
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/components/master-data/CrudTable.tsx:108:7",
				"data-prohibitions": "[editContent]",
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/components/master-data/CrudTable.tsx:109:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/components/master-data/CrudTable.tsx:110:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/components/master-data/CrudTable.tsx:111:13",
								"data-prohibitions": "[editContent]",
								children: [
									form.id ? "Editar Cadastro" : "Novo Cadastro",
									" - ",
									title
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/master-data/CrudTable.tsx:115:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/master-data/CrudTable.tsx:117:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/master-data/CrudTable.tsx:118:17",
									"data-prohibitions": "[editContent]",
									children: c.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/master-data/CrudTable.tsx:119:17",
									"data-prohibitions": "[editContent]",
									value: form[c.key] || "",
									onChange: (e) => setFormData({
										...form,
										[c.key]: e.target.value
									})
								})]
							}, c.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/master-data/CrudTable.tsx:126:11",
							"data-prohibitions": "[]",
							className: "flex justify-end gap-2 pt-4 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/master-data/CrudTable.tsx:127:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/master-data/CrudTable.tsx:130:13",
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
export { CrudTable as t };

//# sourceMappingURL=CrudTable-BX5ciYwA.js.map