## Components Folder

This folder contains all the components used in the project. Each component is a folder with the following structure:

```
📁 ComponentName
├── 📄ComponentName.tsx
├── 📄ComponentName.module.css
├── 📄ComponentName.definitions.ts
└── 📁__tests__
    └─── ComponentName.test.ts
```

---

## Important Files

###### ComponentName.tsx

This file contains the component itself. It is a React component that can be used in any other component or page.

###### ComponentName.module.css

This file contains the styles for the component. It is a CSS module, so the styles are scoped to the component.

###### ComponentName.definitions.tsx

This file contains the typescript definitions for the component. It is a typescript file that exports the types for the component. This includes the interface for the props and other types that are used in the component.

###### ComponentName.test.tsx

This file contains the jest tests for the component. It is a React Testing Library test file that tests the component.
