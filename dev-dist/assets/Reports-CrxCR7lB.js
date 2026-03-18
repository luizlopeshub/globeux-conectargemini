import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-BvGAN_4N.js";
import { t as Button } from "./button-4pbr5ZBd.js";
import { r as createLucideIcon } from "./utils-BK5XrqCc.js";
import { a as SelectLabel, i as SelectItem, n as SelectContent, o as SelectTrigger, r as SelectGroup, s as SelectValue, t as Select } from "./select-DVnC6hHG.js";
import { n as format, r as Download, t as AuditReportDialog } from "./AuditReportDialog-CxcN40zz.js";
import { t as FileText } from "./file-text-DkCcBZWi.js";
import { g as Input, t as useAppStore } from "./index-B4YbBch6.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BQ7gmVYT.js";
import "./dialog-sP8ifLBh.js";
import { t as Label } from "./label-BFlnB3Nd.js";
var FunnelX = createLucideIcon("funnel-x", [
	["path", {
		d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
		key: "ol2ft2"
	}],
	["path", {
		d: "m16.5 3.5 5 5",
		key: "15e6fa"
	}],
	["path", {
		d: "m21.5 3.5-5 5",
		key: "m0lwru"
	}]
]);
//#endregion
//#region src/pages/Reports.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Reports() {
	const { audits, templates, entityDefs, entityRecords } = useAppStore();
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("all");
	const [dateFrom, setDateFrom] = (0, import_react.useState)("");
	const [dateTo, setDateTo] = (0, import_react.useState)("");
	const [selectedRef, setSelectedRef] = (0, import_react.useState)("all");
	const [searchDoc, setSearchDoc] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [selectedAudit, setSelectedAudit] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		return audits.filter((a) => {
			if (selectedTemplate !== "all" && a.templateId !== selectedTemplate) return false;
			if (status !== "all" && a.status !== status && a.approvalStatus !== status) return false;
			if (searchDoc && !a.id.toLowerCase().includes(searchDoc.toLowerCase())) return false;
			if (selectedRef !== "all") {
				if (!Object.values(a.answers).includes(selectedRef)) return false;
			}
			if (dateFrom && new Date(a.timestamp) < new Date(dateFrom)) return false;
			if (dateTo && new Date(a.timestamp) > new Date(new Date(dateTo).getTime() + 864e5)) return false;
			return true;
		});
	}, [
		audits,
		selectedTemplate,
		status,
		searchDoc,
		selectedRef,
		dateFrom,
		dateTo
	]);
	const resolveValue = (val) => {
		if (typeof val === "string" && val.length > 0) {
			const record = entityRecords.find((r) => r.id === val);
			if (record) return record[entityDefs.find((d) => d.id === record.entityId)?.fields[0]?.id || "id"] || record.id;
		}
		return String(val);
	};
	const handleClear = () => {
		setSelectedTemplate("all");
		setDateFrom("");
		setDateTo("");
		setSelectedRef("all");
		setSearchDoc("");
		setStatus("all");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Reports.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:75:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Reports.tsx:76:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Reports.tsx:77:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold",
						children: "Relatórios e Consultas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Reports.tsx:78:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Motor de busca avançado por integridade relacional."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Reports.tsx:82:9",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						"data-uid": "src/pages/Reports.tsx:83:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), " Exportar Dados"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:87:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-card p-4 rounded-lg border shadow-sm items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:88:9",
						"data-prohibitions": "[editContent]",
						className: "space-y-2 lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:89:11",
							"data-prohibitions": "[]",
							children: "Visão / Template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:90:11",
							"data-prohibitions": "[editContent]",
							value: selectedTemplate,
							onValueChange: setSelectedTemplate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:91:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:92:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Checklist"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:94:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:95:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todas as Visões"
								}), templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:97:17",
									"data-prohibitions": "[editContent]",
									value: t.id,
									children: t.name
								}, t.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:104:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:105:11",
							"data-prohibitions": "[]",
							children: "Status Geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:106:11",
							"data-prohibitions": "[]",
							value: status,
							onValueChange: setStatus,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:107:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:108:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:110:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:111:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Qualquer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:112:15",
										"data-prohibitions": "[]",
										value: "Concluído",
										children: "Concluído"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:113:15",
										"data-prohibitions": "[]",
										value: "Aprovado",
										children: "Aprovado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:114:15",
										"data-prohibitions": "[]",
										value: "Rejeitado",
										children: "Rejeitado"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:118:9",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:119:11",
							"data-prohibitions": "[]",
							children: "Referência de Cadastro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:120:11",
							"data-prohibitions": "[editContent]",
							value: selectedRef,
							onValueChange: setSelectedRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:121:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:122:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Qualquer"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:124:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:125:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todos"
								}), entityDefs.map((def) => {
									const recs = entityRecords.filter((r) => r.entityId === def.id);
									if (recs.length === 0) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, {
										"data-uid": "src/pages/Reports.tsx:130:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel, {
											"data-uid": "src/pages/Reports.tsx:131:21",
											"data-prohibitions": "[editContent]",
											children: def.name
										}), recs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Reports.tsx:133:23",
											"data-prohibitions": "[editContent]",
											value: r.id,
											children: r[def.fields[0]?.id || "id"]
										}, r.id))]
									}, def.id);
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:143:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:144:11",
							"data-prohibitions": "[]",
							children: "Data Início"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Reports.tsx:145:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFrom,
							onChange: (e) => setDateFrom(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:147:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Reports.tsx:148:11",
							"data-prohibitions": "[]",
							className: "space-y-2 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/Reports.tsx:149:13",
								"data-prohibitions": "[]",
								children: "Data Fim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Reports.tsx:150:13",
								"data-prohibitions": "[editContent]",
								type: "date",
								value: dateTo,
								onChange: (e) => setDateTo(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Reports.tsx:152:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "icon",
							onClick: handleClear,
							title: "Limpar Filtros",
							className: "mt-7 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
								"data-uid": "src/pages/Reports.tsx:159:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Reports.tsx:164:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/Reports.tsx:165:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/Reports.tsx:166:11",
						"data-prohibitions": "[]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:167:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:168:15",
									"data-prohibitions": "[]",
									children: "Documento / REF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:169:15",
									"data-prohibitions": "[]",
									children: "Data"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:170:15",
									"data-prohibitions": "[]",
									children: "Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:171:15",
									"data-prohibitions": "[]",
									children: "Principais Registros Mestre"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:172:15",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/Reports.tsx:175:11",
						"data-prohibitions": "[editContent]",
						children: [filtered.map((a) => {
							const refs = Object.values(a.answers).filter((v) => typeof v === "string" && !v.includes("http") && entityRecords.some((r) => r.id === v));
							const resolvedRefs = refs.map(resolveValue).filter((r) => r !== String(refs[0])).slice(0, 2).join(" / ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Reports.tsx:189:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:190:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono text-xs",
										children: a.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:191:19",
										"data-prohibitions": "[editContent]",
										children: format(new Date(a.timestamp), "dd/MM/yyyy")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:192:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: a.templateName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:193:19",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground",
										children: resolvedRefs || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:194:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/Reports.tsx:195:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "sm",
											onClick: () => setSelectedAudit(a),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/Reports.tsx:196:23",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-2"
											}), " Detalhes"]
										})
									})
								]
							}, a.id);
						}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:203:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/Reports.tsx:204:17",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhum registro encontrado para estes filtros."
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditReportDialog, {
				"data-uid": "src/pages/Reports.tsx:212:7",
				"data-prohibitions": "[editContent]",
				audit: selectedAudit,
				onClose: () => setSelectedAudit(null),
				showApproval: false
			})
		]
	});
}
//#endregion
export { Reports as default };

//# sourceMappingURL=Reports-CrxCR7lB.js.map