# Watch List App

This is a demo app, with the basic implementation for a watch list for all kinds of media! From movies to series to... TikToks(?).
The current media details are quite limited, but it would be easy to extend them with other media types and additional information!

The following sections will dive into the different design aspects for the app, as well as some of the limitations and potential improvements.

## App structure

- `/components/`  
  Contains reusable components, that are not tied to any business logic, and could be used for different pages/apps. They may import utils and themes, but no data/stores/...

- `/data/`  
  Just a folder for the initial dummy data. It would not exist if we had an actual backend that persisted the state.

- `/pages/`  
  Components and logic to render the different pages of the app, including new components which are only useful to the given page. If one of those components could be useful for other places, it should be extracted and moved to `components`.

- `/state/`  
  States and stores that contain the data for the app.

- `/theme/`  
  Contains information about the theme, such as colors, fonts and default sizes. Could be extended into a proper design system.

- `/utils/`  
  Utility functions and classes than can be used by different parts of the app.

## Themeing

The theme is closely related to recommendations and example from Google's material design, looking at both [version 2](https://m2.material.io/design/color/dark-theme.html) and [version 3](https://m3.material.io/styles/color/overview).

## Dependencies

Building such an app (quickly) naturally requires some libraries to take off some of the load. Here's the reasoning behind the different dependencies used for this project.

- `@emotion/css`  
  Emotion helps to write encapsulated CSS, without taking over most/all the CSS work (like e.g. Tailwind). After all, I want to show that I am able to write sensible CSS. Note that I did not optimize emotion for this kind of use.

- `wouter`  
  `wouter` is a small bundle for routing. An app like this could do without, so using this is just for demo purposes.

- `jotai`  
  `jotai` provides a slim API for state management and is easy to pick up. It also has a built in feature to persist to local storage. `jotai-immer` leverages immutable data, which makes memoizing more reliable. `immer`'s producers make it easy and safe just update the draft instead of either (deep) copying objects or dealing with the risks of unnoticed deep changes.

- `react-hook-form`  
  There are quite a lot of things to consider when building forms, from submitting to validating. `react-hook-form` makes a lot of that much easier

- `echarts`  
  I wanted to show something more visual, and `echarts` is a very powerful library for just that! It's a large library, so if it were just for some pie charts, something else may be a better choice.

## Potential improvements

Naturally there are a lot of details that can be improved, and features that can be added. Here are a few ideas, in no particular order:

- Provide predefined genres
- Multiselect for genres (with a minimum of 1)
- Better form validation, showing details about the validation errors
- Improved sorting (more options) and filtering of entries
- Virtual list for cards (for better scaling with many items)
- Error boundaries, in case something does go wrong
- Refined design/theme
- Proper handling for long user inputs
- Proper tooltips, instead of relying on the `title` prop
- Refine the modal implementation, make it easier to reuse for forms
- Remove global state, provide it via e.g. context (making it easier to stub/mock when testing)
- Accessibility! The color theme ensures good contrast, but there are many other aspect, such as aria-labels and roles, that would help when this app is used by e.g. vision impaired people.
- Mobile optimization. The current layout is quite responsive, but it could be improved for a better mobile experience.
- **TESTS**, e.g. using the React Testing Library

## FAQ

- Why memoize (almost) everything?  
  [This article](https://attardi.org/why-we-memo-all-the-things/) makes some compelling arguments as to why. TLDR: React keeps previous props around anyhow, and the shallow equality check for props is very fast. So there are hardly any downsides to memoizing most components, while it does help with performance.

- Why do `export const MyComponent - React.memo(function MyComponent() {})`?  
  As mentioned above, components are mostly memoized. By making them named functions, these components have a proper name instead of e.g. "Anonymous" when inspecting the app via the React dev tools. Of course, there are other ways of achieving this; I just picked one and stuck with it.

- Why not use `@emotion/react`?  
  `@emotion/css` can be used to write inline, encapsulated CSS with mostly the same syntax, so it's better to show that I can write CSS with any library (just like `@emotion/react`). Additionally, `@emotion/css`'s `css` returns a class name, which can be used just like any other class names, whereas `@emotion/react`'s `css` returns a styles object that needs to be applied... which requires a babel plugin to work with the basic HTML tags.
