import { n as require_react, t as require_jsx_runtime } from './jsx-runtime-DrpR9Qps.js'
import { i as cva } from './button-4pbr5ZBd.js'
import { t as cn } from './utils-BK5XrqCc.js'
require_react()
var import_jsx_runtime = require_jsx_runtime()
var badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/components/ui/badge.tsx:30:10',
    'data-prohibitions': '[editContent]',
    className: cn(badgeVariants({ variant }), className),
    ...props,
  })
}
//#endregion
export { Badge as t }

//# sourceMappingURL=badge-GPxyS5OZ.js.map
