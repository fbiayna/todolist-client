# ToDoList

## Package name

`com.todolist.app`

## Running Android app

### DEV
`npx react-native run-android --variant=devDebug --appIdSuffix=dev`

### PROD
`npx react-native run-android --variant=prodDebug`

## Running iOS app

### DEV
`npx react-native run-android --variant=devDebug --appIdSuffix=dev`

### PROD
`npx react-native run-android --variant=prodDebug --appIdSuffix=prod`

## Firestore data model

```
.
├── items
│   └── [id]
│       ├── title: string
│       └── isDone: boolean
└── users
    └── [id]
        ├── email: string
        ├── itemsIDs: string[]
        └── name: string
```

