# ts-pack

Simple build tool for Typescript projects

## How to use

For devt mode

`ts-pack dev`

For production:

`ts-pack prod`

Just add `tsconfig.json` on your root folder with the following values. 

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
