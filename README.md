# Rentman Test Assignment

This project is a test assignment for a Rentman company for a position as a senior front-end developer.

## Requirements

Requirements for the assignment can be found by the following link: [Requirements](public/docs/Front-end%20assessment.pdf)

## Design

Design is available in Figma by the following link: [Design](https://www.figma.com/design/pPvMOOEOgmioZ7ilJVQrZq/Front-end-Assessment?node-id=1-564&t=09AoEJHqEy9jF1yo-0)

## Project tech stack

- NodeJS v20.18.0
- NPM v10.8.2
- Angular v19.2.0

## How to run

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## How to build

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

To run built application with SSR, run:
```bash
npm run serve:ssr
```

## How to test

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```



## Known issues

- There is currently a bug with the counter - sometimes it doesn't show the correct values if you play around with the filters.
- Bold text doesn't always remain for expanded items.
- There is currently a bug with hover background of tree items not occupying the full width of the filter


## Possible improvements

The project is naturally is not production ready and has some limitations due to time constraints. The following improvements can be made:

### Project structure

- Dockerize the project
- Use a CI/CD pipeline
- Use a linter
- Use a security check either by "npm audit" or 3rd party tools like Snyk or SonarQube
- Use a code coverage tool

### Code

- Move multiselect component into a separate package of Design System and import it from there.
- Optimize the data structure coming from backend - maybe form a tree structure there instead of frontend to avoid extra mappings.
- Logic for handling tree manupulations (e.g. expand/collapse, select/unselect) can be improved to make it more readable.
- May be a good idea to move ```.parent__expander``` class into a separate component to separate its logic from the main multiselect component.

### UI

- Add animations for collapse/expand

