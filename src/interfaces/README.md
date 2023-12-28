## Interfaces Folder

This folder contains all the interfaces used in the project. Each interface is a file in the folder with the following structure:

```
📁 interfaces
├── 📄InterfaceName.ts
├── 📄InterfaceName2.ts
├── 📄InterfaceName3.ts
...
```

---

## Important Files

###### InterfaceName.ts

This file contains the interface itself. It is a typescript file that exports the interface. Interfaces are used to define the types of objects. They are used to define the types of props and state in React components. They are also used to define the types of objects in the context.

```

GENERAL INFO:
"Full Name": string;
Street: string;
Country: string;
Email: string;
Type: string; //passenger or patient
"Military Service": string;
"Military Member": string[];
Created: string;
"How did you hear about us": string[];

MEDICAL INFO:
"Date of Birth": string;
Gender: string;
Ethnicity: string[];
Diagnosis: string[];

FINANCIAL INFO:
"Household Income": number;
"Household Size": number;

FLIGHT INFO:
"All Flight Legs": string[];
"# of Flight Legs": number;
"# of Booked Flight Requests (Patient)": number;
```
