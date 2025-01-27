# Test project was created with React Vite



## Installation

```bash
yarn
```

## Running

```bash
# dev mode
yarn dev

# production mode
yarn start
```

## Build

```bash
# production mode
yarn build
```

## Code Style

- Pass an object as argument of function, if quantity of needed arguments more than 2.
- Variables' name must:

  - Describe value of var

  ```diff
  type: string
  - Incorrect: error
  + Correct: errorMessage

  type: boolean
  - Incorrect: loading
  + Correct: isLoading

  - Incorrect: isNotActive (Just imagine !isNotActive)
  + Correct: isActive

  type: object
  - Incorrect: isUser (Just imagine isUser.fullName)
  + Correct: user (user.fullName)
  ```

## More information:

- [Typescript](https://www.typescriptlang.org/) as a main programming language
- [Prettier](https://prettier.io/docs/en/index.html) for formatting code
- [Husky](https://typicode.github.io/husky/#/) git hooks made easy
- [Eslint](https://eslint.org) for linting and formatting staged files
- [CI/CD](https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps) and docker for deployment in prod and dev
