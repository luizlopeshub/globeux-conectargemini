import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-BvGAN_4N.js";
import { t as Button } from "./button-4pbr5ZBd.js";
import { n as generateId } from "./utils-BK5XrqCc.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-hqG6fXx6.js";
import { t as Pen } from "./pen-wKVsLz2F.js";
import { t as Plus } from "./plus-O0eIQ_JH.js";
import { t as Save } from "./save-DUwVNF0n.js";
import { t as Trash2 } from "./trash-2-Og1H9Lex.js";
import { g as Input, t as useAppStore, y as Database } from "./index-BdkbARb4.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card--sks-GK7.js";
import { t as Label } from "./label-B0O5-18s.js";
//#region src/pages/master-data/EntityConfig.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function EntityConfig() {
	const { entityDefs, saveEntityDef, deleteEntityDef } = useAppStore();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const handleEdit = (def) => {
		if (def) setEditing({
			...def,
			fields: [...def.fields]
		});
		else setEditing({
			id: `ent_${generateId().substring(0, 6)}`,
			name: "",
			slug: "",
			fields: []
		});
	};
	const handleSave = () => {
		if (!editing || !editing.name || !editing.slug || editing.fields.length === 0) return;
		saveEntityDef(editing);
		setEditing(null);
	};
	const addField = () => {
		if (!editing) return;
		setEditing({
			...editing,
			fields: [...editing.fields, {
				id: `f_${generateId().substring(0, 6)}`,
				name: "",
				type: "text"
			}]
		});
	};
	const updateField = (idx, updates) => {
		if (!editing) return;
		const newFields = [...editing.fields];
		newFields[idx] = {
			...newFields[idx],
			...updates
		};
		setEditing({
			...editing,
			fields: newFields
		});
	};
	const removeField = (idx) => {
		if (!editing) return;
		setEditing({
			...editing,
			fields: editing.fields.filter((_, i) => i !== idx)
		});
	};
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master-data/EntityConfig.tsx:58:7",
		"data-prohibitions": "[editContent]",
		className: "max-w-3xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:59:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:60:11",
					"data-prohibitions": "[editContent]",
					className: "text-2xl font-bold",
					children: editing.name ? `Editar Entidade: ${editing.name}` : "Nova Entidade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:63:11",
					"data-prohibitions": "[]",
					className: "space-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:64:13",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setEditing(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:67:13",
						"data-prohibitions": "[]",
						onClick: handleSave,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:68:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), " Salvar Entidade"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:72:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:73:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:74:13",
						"data-prohibitions": "[]",
						children: "Configurações Básicas"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:76:11",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:77:13",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:78:15",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:79:17",
								"data-prohibitions": "[]",
								children: "Nome da Entidade (Ex: Motoristas)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:80:17",
								"data-prohibitions": "[editContent]",
								value: editing.name,
								onChange: (e) => setEditing({
									...editing,
									name: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:85:15",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:86:17",
								"data-prohibitions": "[]",
								children: "Slug da Rota (Ex: motoristas)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:87:17",
								"data-prohibitions": "[editContent]",
								value: editing.slug,
								onChange: (e) => setEditing({
									...editing,
									slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
								})
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:100:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:101:11",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:102:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:103:15",
							"data-prohibitions": "[]",
							children: "Estrutura de Dados (Campos)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:104:15",
							"data-prohibitions": "[]",
							children: "Defina as colunas para esta tabela customizada."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:106:13",
						"data-prohibitions": "[]",
						size: "sm",
						onClick: addField,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:107:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), " Adicionar Campo"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:110:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: [editing.fields.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:112:15",
						"data-prohibitions": "[]",
						className: "flex items-center gap-3 p-3 bg-muted/50 rounded-lg border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:113:17",
								"data-prohibitions": "[]",
								className: "flex-1 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/master-data/EntityConfig.tsx:114:19",
									"data-prohibitions": "[]",
									className: "text-xs",
									children: "Nome do Campo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/master-data/EntityConfig.tsx:115:19",
									"data-prohibitions": "[editContent]",
									value: f.name,
									onChange: (e) => updateField(i, { name: e.target.value }),
									placeholder: "Ex: CPF, Data de Validade..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:121:17",
								"data-prohibitions": "[]",
								className: "w-1/3 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/master-data/EntityConfig.tsx:122:19",
									"data-prohibitions": "[]",
									className: "text-xs",
									children: "Tipo do Dado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/master-data/EntityConfig.tsx:123:19",
									"data-prohibitions": "[]",
									value: f.type,
									onValueChange: (v) => updateField(i, { type: v }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/master-data/EntityConfig.tsx:124:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/master-data/EntityConfig.tsx:125:23",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/master-data/EntityConfig.tsx:127:21",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/master-data/EntityConfig.tsx:128:23",
												"data-prohibitions": "[]",
												value: "text",
												children: "Texto / Varchar"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/master-data/EntityConfig.tsx:129:23",
												"data-prohibitions": "[]",
												value: "number",
												children: "Número / Numérico"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/master-data/EntityConfig.tsx:130:23",
												"data-prohibitions": "[]",
												value: "date",
												children: "Data"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:134:17",
								"data-prohibitions": "[]",
								className: "pt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/master-data/EntityConfig.tsx:135:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => removeField(i),
									className: "text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/pages/master-data/EntityConfig.tsx:141:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									})
								})
							})
						]
					}, i)), editing.fields.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:147:15",
						"data-prohibitions": "[]",
						className: "text-center text-muted-foreground py-8 text-sm",
						children: "Nenhum campo definido. Adicione o primeiro campo."
					})]
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master-data/EntityConfig.tsx:158:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/master-data/EntityConfig.tsx:159:7",
			"data-prohibitions": "[]",
			className: "flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:160:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:161:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold",
					children: "Construtor de Cadastros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:162:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Crie e gerencie entidades de dados dinâmicas para o sistema."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:166:9",
				"data-prohibitions": "[]",
				onClick: () => handleEdit(),
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:167:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				}), " Nova Entidade"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/master-data/EntityConfig.tsx:171:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
			children: entityDefs.map((def) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/master-data/EntityConfig.tsx:173:11",
				"data-prohibitions": "[editContent]",
				className: "hover:border-primary/50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:174:13",
					"data-prohibitions": "[editContent]",
					className: "pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:175:15",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2 text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:176:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-primary"
							}),
							" ",
							def.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:178:15",
						"data-prohibitions": "[editContent]",
						children: ["/", def.slug]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/master-data/EntityConfig.tsx:180:13",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:181:15",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-muted-foreground mb-4",
						children: [def.fields.length, " campos configurados."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/master-data/EntityConfig.tsx:184:15",
						"data-prohibitions": "[]",
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:185:17",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "flex-1",
							onClick: () => handleEdit(def),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:191:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Editar"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/master-data/EntityConfig.tsx:193:17",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "text-destructive hover:bg-destructive hover:text-white",
							onClick: () => deleteEntityDef(def.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								"data-uid": "src/pages/master-data/EntityConfig.tsx:199:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							})
						})]
					})]
				})]
			}, def.id))
		})]
	});
}
//#endregion
export { EntityConfig as default };

//# sourceMappingURL=EntityConfig-1lixDxRH.js.map