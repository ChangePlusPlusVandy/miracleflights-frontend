## Util Folder

This folder contains all the utility functions used in the project. Each utility function is a file in the folder with the following structure:

```
📁 util
├── 📄utilName1.ts
├── 📄utilName2.ts
├── 📄utilName3.ts
└── 📁__tests__
    ├─── utilName1.test.ts
    ├─── utilName2.test.ts
    └─── utilName3.test.ts
...
```

---

## Important Files

###### utilName.ts

This file contains the utility function itself. It is a typescript file that exports the utility function. Utility functions are used to perform common tasks. They are used to perform tasks such as formatting dates, converting strings to numbers, and converting numbers to strings. Each utility function should be tested in the `utilName.test.ts` file.

###### utilName.test.ts

This file contains the jest tests for the utility function. It is a jest test file that tests the utility function.
