# BeBalance Mobile app

This project is mainly focused on Android platform.

### Technologies

1. [React Native Expo](https://docs.expo.dev/get-started/set-up-your-environment/) — mobile library.
2. [Redux Toolkit](https://redux-toolkit.js.org/) — state manager.

### Folder Structure

1. assets — static assets (images, fonts);
2. components — common, reusable UI components;
3. constants — application-wide constants;
4. features — main app functionalities;
5. helpers — utility functions and helper methods;
6. hooks — custom React hooks;
7. store — Redux Toolkit state management;
8. types — common type definitions.

### Install dependencies

1. In the root of the mobile folder.

   ```bash
   npm install
   ```

2. Create .env file. Use .env.example as a template.

### Start the mobile app

```bash
 npm run start
```

If you want to run the app locally not using the Expo Go, but building it as a separate application, you'll need to run

```bash
 npm run prebuild
```

and then

```bash
 npm run android
```

### Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
