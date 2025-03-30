# CLAUDE.md - Guidelines for Claude Code

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript
- `npm run preview` - Preview production build

## Code Style Guidelines
- **Imports**: Use "~/" alias for app imports (e.g., `import { Button } from "~/components/ui/button"`)
- **Components**: Follow shadcn/ui patterns for component development
- **Types**: Use TypeScript interfaces/types and Zod schemas for validation
- **Forms**: Use React Hook Form with Zod schema validation
- **State Management**: Use React Context and TanStack Query
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Error Handling**: Use try/catch blocks with toast notifications
- **File Structure**: Group related components in folders (e.g., `/components/code/`)
- **Formatting**: Follows Prettier defaults with ESLint integration
- **Styling**: Use Tailwind CSS utility classes with class-variance-authority

This project is a Remix SPA with shadcn/ui components using TypeScript. It follows a modular approach with dedicated component folders for each feature area.