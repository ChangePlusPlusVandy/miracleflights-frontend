## Context Folder

This folder contains all the context used in the project. Each context is a folder with the following structure:

```
📁 ContextName
├── 📄ContextName.tsx
├── 📄ContextName.definitions.ts
└── 📁__tests__
    └─── ContextName.test.ts
```

---

## Important Files

###### ContextName.tsx

This file contains the context itself. It is a React component that can be used in any other component or page. It is a React Context that can be used to store global state. Only components that are children of the context provider can access the state.

###### ContextName.definitions.tsx

This file contains the typescript definitions for the context. It is a typescript file that exports the types for the context. This includes the interface for the props and other types that are used in the context.

###### ContextName.test.tsx

This file contains the jest tests for the context. It is a React Testing Library test file that tests the context.
