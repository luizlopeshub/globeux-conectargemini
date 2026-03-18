import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-DTGFhbJu.js";
import { t as Button } from "./button-BhsDJ-bV.js";
import { r as createLucideIcon } from "./utils-DeT4lGOf.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C1sqcamL.js";
import { n as format, r as Download, t as AuditReportDialog } from "./AuditReportDialog-CjB-oxTc.js";
import { t as FileText } from "./file-text-DkCnmzog.js";
import { g as Input, t as useAppStore } from "./index-5LHpi1CV.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D0JISnoT.js";
import "./dialog-BJcZ5kRc.js";
import { t as Label } from "./label-DYYDBAuO.js";
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
	const { audits, templates, clients, products, carriers } = useAppStore();
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("all");
	const [dateFrom, setDateFrom] = (0, import_react.useState)("");
	const [dateTo, setDateTo] = (0, import_react.useState)("");
	const [selectedClient, setSelectedClient] = (0, import_react.useState)("all");
	const [searchDoc, setSearchDoc] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [selectedAudit, setSelectedAudit] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		return audits.filter((a) => {
			if (selectedTemplate !== "all" && a.templateId !== selectedTemplate) return false;
			if (status !== "all" && a.status !== status && a.approvalStatus !== status) return false;
			if (searchDoc && !a.id.toLowerCase().includes(searchDoc.toLowerCase())) return false;
			if (selectedClient !== "all") {
				if (!Object.values(a.answers).includes(selectedClient)) return false;
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
		selectedClient,
		dateFrom,
		dateTo
	]);
	const resolveValue = (val) => {
		if (typeof val === "string") {
			const e = clients.find((c) => c.id === val) || products.find((p) => p.id === val) || carriers.find((c) => c.id === val);
			if (e) return e.name;
		}
		return String(val);
	};
	const handleClear = () => {
		setSelectedTemplate("all");
		setDateFrom("");
		setDateTo("");
		setSelectedClient("all");
		setSearchDoc("");
		setStatus("all");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Reports.tsx:72:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:73:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Reports.tsx:74:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Reports.tsx:75:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold",
						children: "Relatórios e Consultas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Reports.tsx:76:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Motor de busca avançado por integridade relacional."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Reports.tsx:80:9",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						"data-uid": "src/pages/Reports.tsx:81:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), " Exportar Dados"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:85:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-card p-4 rounded-lg border shadow-sm items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:86:9",
						"data-prohibitions": "[editContent]",
						className: "space-y-2 lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:87:11",
							"data-prohibitions": "[]",
							children: "Visão / Template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:88:11",
							"data-prohibitions": "[editContent]",
							value: selectedTemplate,
							onValueChange: setSelectedTemplate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:89:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:90:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Checklist"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:92:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:93:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todas as Visões"
								}), templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:95:17",
									"data-prohibitions": "[editContent]",
									value: t.id,
									children: t.name
								}, t.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:102:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:103:11",
							"data-prohibitions": "[]",
							children: "Status Geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:104:11",
							"data-prohibitions": "[]",
							value: status,
							onValueChange: setStatus,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:105:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:106:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:108:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:109:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Qualquer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:110:15",
										"data-prohibitions": "[]",
										value: "Concluído",
										children: "Concluído"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:111:15",
										"data-prohibitions": "[]",
										value: "Aprovado",
										children: "Aprovado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:112:15",
										"data-prohibitions": "[]",
										value: "Rejeitado",
										children: "Rejeitado"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:116:9",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:117:11",
							"data-prohibitions": "[]",
							children: "Cliente (Referência)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:118:11",
							"data-prohibitions": "[editContent]",
							value: selectedClient,
							onValueChange: setSelectedClient,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:119:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:120:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Cliente"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:122:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:123:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todos"
								}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:125:17",
									"data-prohibitions": "[editContent]",
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:132:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:133:11",
							"data-prohibitions": "[]",
							children: "Data Início"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Reports.tsx:134:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFrom,
							onChange: (e) => setDateFrom(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:136:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Reports.tsx:137:11",
							"data-prohibitions": "[]",
							className: "space-y-2 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/Reports.tsx:138:13",
								"data-prohibitions": "[]",
								children: "Data Fim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Reports.tsx:139:13",
								"data-prohibitions": "[editContent]",
								type: "date",
								value: dateTo,
								onChange: (e) => setDateTo(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Reports.tsx:141:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "icon",
							onClick: handleClear,
							title: "Limpar Filtros",
							className: "mt-7 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
								"data-uid": "src/pages/Reports.tsx:148:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Reports.tsx:153:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/Reports.tsx:154:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/Reports.tsx:155:11",
						"data-prohibitions": "[]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:156:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:157:15",
									"data-prohibitions": "[]",
									children: "Documento / REF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:158:15",
									"data-prohibitions": "[]",
									children: "Data"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:159:15",
									"data-prohibitions": "[]",
									children: "Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:160:15",
									"data-prohibitions": "[]",
									children: "Principais Registros (Cliente/Transp.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:161:15",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/Reports.tsx:164:11",
						"data-prohibitions": "[editContent]",
						children: [filtered.map((a) => {
							const refs = Object.values(a.answers).filter((v) => typeof v === "string" && (v.startsWith("c") || v.startsWith("t") || v.startsWith("p")) && !v.includes("http"));
							const resolvedRefs = refs.map((r) => resolveValue(r)).filter((r) => r !== String(refs[0])).slice(0, 2).join(" / ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Reports.tsx:178:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:179:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono text-xs",
										children: a.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:180:19",
										"data-prohibitions": "[editContent]",
										children: format(new Date(a.timestamp), "dd/MM/yyyy")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:181:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: a.templateName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:182:19",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground",
										children: resolvedRefs || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:183:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/Reports.tsx:184:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "sm",
											onClick: () => setSelectedAudit(a),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/Reports.tsx:185:23",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-2"
											}), " Detalhes"]
										})
									})
								]
							}, a.id);
						}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:192:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/Reports.tsx:193:17",
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
				"data-uid": "src/pages/Reports.tsx:202:7",
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

//# sourceMappingURL=Reports-FmUeV40i.js.map