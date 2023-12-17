## Project File Structure
### Frontend
Keep related files and folders within the same directory. Here's an example of what it might look like below:
```
  app/
    page.tsx
    helpers.ts
    _components/
    types.ts
    signUp/
      page.tsx
      helpers.ts
      _components/
      types.ts
    payment/
      page.tsx
      helpers.ts
      _components/
      types.ts
  components/
  lib/
``` 
#### Local Files
- `helpers.ts` contains any helper functions and it may also be turned into a `_helpers/` folder if complex logic is necessary. 
- `_components/` contains all components used in the local page
- `types.ts` contains all local types necessary, and may also be turned into a `_types/` folder if a larger amount of types of separation of concern is necessary
- `components/` contains any reusable components found in multiple pages
#### Global Files
- `components/` contains any reusable components that may be found on different pages
- `lib/` contains any other global utility functions and files, such as contexts, global types, global state management such as jotai, anything else that may be helpful

### Backend