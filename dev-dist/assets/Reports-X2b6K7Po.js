import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-BvGAN_4N.js";
import { t as Button } from "./button-4pbr5ZBd.js";
import { r as createLucideIcon } from "./utils-BK5XrqCc.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-hqG6fXx6.js";
import { n as format, r as Download, t as AuditReportDialog } from "./AuditReportDialog-DrhRSan8.js";
import { t as FileText } from "./file-text-DkCcBZWi.js";
import { t as SmartLookup } from "./SmartLookup-D8ZWINTO.js";
import { E as useSearchParams, g as Input, t as useAppStore } from "./index-BdkbARb4.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Dtli7RRJ.js";
import "./dialog-DNmFlxFU.js";
import { t as Label } from "./label-B0O5-18s.js";
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
	const [searchParams, setSearchParams] = useSearchParams();
	const initialSearchDoc = searchParams.get("searchDoc") || "";
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("all");
	const [dateFrom, setDateFrom] = (0, import_react.useState)("");
	const [dateTo, setDateTo] = (0, import_react.useState)("");
	const [selectedRef, setSelectedRef] = (0, import_react.useState)("");
	const [searchDoc, setSearchDoc] = (0, import_react.useState)(initialSearchDoc);
	const [status, setStatus] = (0, import_react.useState)("all");
	const [selectedAudit, setSelectedAudit] = (0, import_react.useState)(null);
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(20);
	(0, import_react.useEffect)(() => {
		if (initialSearchDoc) setSearchDoc(initialSearchDoc);
	}, [initialSearchDoc]);
	const filtered = (0, import_react.useMemo)(() => {
		return audits.filter((a) => {
			if (selectedTemplate !== "all" && a.templateId !== selectedTemplate) return false;
			if (status !== "all" && a.status !== status && a.approvalStatus !== status) return false;
			if (searchDoc) {
				const term = searchDoc.toLowerCase();
				const matchId = a.id.toLowerCase().includes(term);
				const matchAnswers = Object.values(a.answers).some((val) => String(val).toLowerCase().includes(term));
				if (!matchId && !matchAnswers) return false;
			}
			if (selectedRef) {
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
	const paginated = (0, import_react.useMemo)(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
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
		setSelectedRef("");
		setSearchDoc("");
		setStatus("all");
		setSearchParams({});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Reports.tsx:92:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:93:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Reports.tsx:94:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Reports.tsx:95:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold",
						children: "Relatórios e Consultas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Reports.tsx:96:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Motor de busca avançado por integridade relacional."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Reports.tsx:100:9",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						"data-uid": "src/pages/Reports.tsx:101:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), " Exportar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:105:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-card p-4 rounded-lg border shadow-sm items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:106:9",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:107:11",
							"data-prohibitions": "[]",
							children: "Visão / Checklist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:108:11",
							"data-prohibitions": "[editContent]",
							value: selectedTemplate,
							onValueChange: setSelectedTemplate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:109:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:110:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Checklist"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:112:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:113:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todas as Visões"
								}), templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Reports.tsx:115:17",
									"data-prohibitions": "[editContent]",
									value: t.id,
									children: t.name
								}, t.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:122:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:123:11",
							"data-prohibitions": "[]",
							children: "Status Geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Reports.tsx:124:11",
							"data-prohibitions": "[]",
							value: status,
							onValueChange: setStatus,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Reports.tsx:125:13",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Reports.tsx:126:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Reports.tsx:128:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:129:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Qualquer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:130:15",
										"data-prohibitions": "[]",
										value: "Concluído",
										children: "Concluído"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:131:15",
										"data-prohibitions": "[]",
										value: "Aprovado",
										children: "Aprovado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Reports.tsx:132:15",
										"data-prohibitions": "[]",
										value: "Rejeitado",
										children: "Rejeitado"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:136:9",
						"data-prohibitions": "[]",
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:137:11",
							"data-prohibitions": "[]",
							children: "Referência Mestre (Smart Lookup)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartLookup, {
							"data-uid": "src/pages/Reports.tsx:138:11",
							"data-prohibitions": "[editContent]",
							value: selectedRef,
							onChange: setSelectedRef,
							allowEntityChange: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:140:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:141:11",
							"data-prohibitions": "[]",
							children: "Busca Global"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Reports.tsx:142:11",
							"data-prohibitions": "[editContent]",
							placeholder: "Doc/NF ou Ref...",
							value: searchDoc,
							onChange: (e) => setSearchDoc(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:148:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:149:11",
							"data-prohibitions": "[]",
							children: "Data Início"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Reports.tsx:150:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFrom,
							onChange: (e) => setDateFrom(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Reports.tsx:152:9",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Reports.tsx:153:11",
							"data-prohibitions": "[]",
							children: "Data Fim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Reports.tsx:154:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateTo,
							onChange: (e) => setDateTo(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Reports.tsx:156:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Reports.tsx:157:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: handleClear,
							className: "w-full text-muted-foreground border border-input",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
								"data-uid": "src/pages/Reports.tsx:162:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 mr-2"
							}), " Limpar Filtros"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Reports.tsx:167:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/Reports.tsx:168:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/Reports.tsx:169:11",
						"data-prohibitions": "[]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:170:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:171:15",
									"data-prohibitions": "[]",
									children: "Documento / REF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:172:15",
									"data-prohibitions": "[]",
									children: "Data"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:173:15",
									"data-prohibitions": "[]",
									children: "Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:174:15",
									"data-prohibitions": "[]",
									children: "Principais Registros Mestre"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Reports.tsx:175:15",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/Reports.tsx:178:11",
						"data-prohibitions": "[editContent]",
						children: [paginated.map((a) => {
							const refs = Object.values(a.answers).filter((v) => typeof v === "string" && !v.includes("http") && entityRecords.some((r) => r.id === v));
							const resolvedRefs = refs.map(resolveValue).filter((r) => r !== String(refs[0])).slice(0, 2).join(" / ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Reports.tsx:192:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:193:19",
										"data-prohibitions": "[editContent]",
										className: "font-mono text-xs",
										children: a.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:194:19",
										"data-prohibitions": "[editContent]",
										children: format(new Date(a.timestamp), "dd/MM/yyyy")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:195:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: a.templateName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:196:19",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground",
										children: resolvedRefs || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Reports.tsx:197:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/Reports.tsx:198:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "sm",
											onClick: () => setSelectedAudit(a),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/Reports.tsx:199:23",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-2"
											}), " Detalhes"]
										})
									})
								]
							}, a.id);
						}), paginated.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/Reports.tsx:206:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/Reports.tsx:207:17",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhum registro encontrado para estes filtros."
							})
						})]
					})]
				}), visibleCount < filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Reports.tsx:215:11",
					"data-prohibitions": "[editContent]",
					className: "p-4 flex justify-center border-t bg-muted/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Reports.tsx:216:13",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: () => setVisibleCount((v) => v + 20),
						children: [
							"Carregar Mais (",
							filtered.length - visibleCount,
							" restantes)"
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditReportDialog, {
				"data-uid": "src/pages/Reports.tsx:222:7",
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

//# sourceMappingURL=Reports-X2b6K7Po.js.map