# ts-pack

Simple build tool for Typescript projects

## How to use

For devt mode

`ts-pack dev`

For production:

`ts-pack prod`

```javascript
{
  "compilerOptions": {
    "outDir": "./public/",
    "experimentalDecorators": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react"
  },
  "include": ["./src/**/*"]
}
```
