import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DrpR9Qps.js";
import "./es2015-DTGFhbJu.js";
import { t as Button } from "./button-BhsDJ-bV.js";
import { n as format, r as Download, t as AuditReportDialog } from "./AuditReportDialog-CjB-oxTc.js";
import { t as FileText } from "./file-text-DkCnmzog.js";
import { S as toast, i as AvatarImage, n as Avatar, r as AvatarFallback, t as useAppStore } from "./index-5LHpi1CV.js";
import { t as Badge } from "./badge-Bu4R3DwI.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D0JISnoT.js";
import "./dialog-BJcZ5kRc.js";
//#region src/pages/AuditLogs.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AuditLogs() {
	const { audits, currentUser, approveAudit } = useAppStore();
	const [selectedAudit, setSelectedAudit] = (0, import_react.useState)(null);
	const handleApprove = (auditId, status) => {
		approveAudit(auditId, status, currentUser?.name || "Sistema");
		toast({
			title: `Auditoria ${status}`,
			description: `Status atualizado com sucesso.`
		});
		setSelectedAudit(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/AuditLogs.tsx:31:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/AuditLogs.tsx:32:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/AuditLogs.tsx:33:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/AuditLogs.tsx:34:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold",
						children: "Logs e Aprovações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/AuditLogs.tsx:35:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Registro imutável e validação de auditorias."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/AuditLogs.tsx:37:9",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						"data-uid": "src/pages/AuditLogs.tsx:38:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), " Exportar (CSV)"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/AuditLogs.tsx:42:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-lg bg-card overflow-hidden shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/AuditLogs.tsx:43:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/AuditLogs.tsx:44:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/AuditLogs.tsx:45:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/AuditLogs.tsx:46:15",
									"data-prohibitions": "[]",
									children: "Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/AuditLogs.tsx:47:15",
									"data-prohibitions": "[]",
									children: "Operador"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/AuditLogs.tsx:48:15",
									"data-prohibitions": "[]",
									children: "Data"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/AuditLogs.tsx:49:15",
									"data-prohibitions": "[]",
									children: "Status / Aprovação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/AuditLogs.tsx:50:15",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
						"data-uid": "src/pages/AuditLogs.tsx:53:11",
						"data-prohibitions": "[editContent]",
						children: [audits.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/AuditLogs.tsx:55:15",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/AuditLogs.tsx:56:17",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: a.templateName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/AuditLogs.tsx:57:17",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/AuditLogs.tsx:58:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											"data-uid": "src/pages/AuditLogs.tsx:59:21",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												"data-uid": "src/pages/AuditLogs.tsx:60:23",
												"data-prohibitions": "[editContent]",
												src: a.operatorAvatar
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												"data-uid": "src/pages/AuditLogs.tsx:61:23",
												"data-prohibitions": "[editContent]",
												children: a.operatorName[0]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/AuditLogs.tsx:63:21",
											"data-prohibitions": "[editContent]",
											className: "text-sm",
											children: a.operatorName
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/AuditLogs.tsx:66:17",
									"data-prohibitions": "[editContent]",
									children: format(new Date(a.timestamp), "dd/MM/yyyy HH:mm")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/AuditLogs.tsx:67:17",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/AuditLogs.tsx:68:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/AuditLogs.tsx:69:21",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: "bg-emerald-50 text-emerald-700 border-emerald-200",
												children: a.status
											}),
											a.approvalStatus === "Pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/AuditLogs.tsx:76:23",
												"data-prohibitions": "[]",
												variant: "secondary",
												className: "bg-amber-100 text-amber-800",
												children: "Pendente"
											}),
											a.approvalStatus === "Aprovado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/AuditLogs.tsx:81:23",
												"data-prohibitions": "[]",
												variant: "default",
												className: "bg-emerald-500",
												children: "Aprovado"
											}),
											a.approvalStatus === "Rejeitado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/AuditLogs.tsx:86:23",
												"data-prohibitions": "[]",
												variant: "destructive",
												children: "Rejeitado"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/AuditLogs.tsx:90:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/AuditLogs.tsx:91:19",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "sm",
										onClick: () => setSelectedAudit(a),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											"data-uid": "src/pages/AuditLogs.tsx:92:21",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 mr-2"
										}), " Relatório"]
									})
								})
							]
						}, a.id)), audits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/AuditLogs.tsx:98:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/AuditLogs.tsx:99:17",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhuma auditoria registrada."
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditReportDialog, {
				"data-uid": "src/pages/AuditLogs.tsx:108:7",
				"data-prohibitions": "[editContent]",
				audit: selectedAudit,
				onClose: () => setSelectedAudit(null),
				showApproval: true,
				onApprove: handleApprove
			})
		]
	});
}
//#endregion
export { AuditLogs as default };

//# sourceMappingURL=AuditLogs-ClBaGFP4.js.map