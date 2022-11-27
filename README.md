# ToDoList

## Package name

`com.todolist.app`

## Environment setup

1. In the root folder, run `yarn install` or `npm install` to install the dependencies.
2. In `ios` folder, run `pod install` to install the pods.

## Build variants

`dev`
`prod`

## Run the app

### Android

##### yarn
`yarn android:{build_variant}`

##### npm
`npm run android:{build_variant}`

### iOS

##### yarn
`yarn ios:{build_variant}`

##### npm
`npm run ios:{build_variant}`

### DEV
`npx react-native run-android --variant=devDebug --appIdSuffix=dev`

### PROD
`npx react-native run-android --variant=prodDebug`

## Running iOS app

### DEV
`npx react-native run-android --variant=devDebug --appIdSuffix=dev`

### PROD
`npx react-native run-android --variant=prodDebug --appIdSuffix=prod`

## User data model

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

