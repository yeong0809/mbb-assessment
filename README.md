
---

# Historical Places App

A **React Native / Redux** app showcasing famous historical places around the world. Users can:

* View a list of places with **name, image, and description**
* Mark/unmark places as **visited**
* Navigate to **Place Details** screen
* Use **deep linking** to open a place directly
* Enjoy a fun interactive feature (e.g., random suggestion)

The app is built with **React Native, Redux, Redux-Observable**, and **React Navigation**.

---

## **Features**

* Display a list of historical places with images and descriptions
* Mark/unmark places as **visited** with real-time UI updates
* Navigate between **Dashboard** and **PlaceDetails** screens
* Support for **deep linking** on both iOS and Android
* Cross-platform: works on **iOS** and **Android**
* Fun interactive feature (e.g., suggest a random place)
* Uses **Redux + Redux-Observable** for state management

---

## **Screens**

1. **Dashboard** – List of all historical places
2. **Place Details** – Detailed information about a selected place, with **visited toggle**

---

## **Folder Structure**

```
src/
├─ app/
│  ├─ Dashboard/          # Dashboard screen
│  ├─ PlaceDetails/       # PlaceDetails screen
├─ assets/
│  ├─ images/             # Images
├─ common/
│  ├─ config/             # Configuration
├─ components/
│  ├─ module/             # module
│  ├─ ui/                 # general-use
├─ hooks/                 # hooks
├─ lib/                   # utility
├─ router/
│  ├─ PagesNavigation.tsx # Navigation container + deep linking
│  ├─ types.ts            # Type definitions for navigation
├─ store/
│  ├─ places/
│     ├─ places.actions.ts
│     ├─ places.epic.ts
│     ├─ places.reducer.ts
│     ├─ places.selectors.ts
│     ├─ places.types.ts
├─ types/
│  └─ navigation.d.ts             # navigation typing
```

---

## **Installation**

```bash
# Install dependencies
npm install
# or
yarn install

# Install iOS pods
cd ios && pod install && cd ..
```

---

## **Running the App**

### iOS

```bash
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

---

## **Deep Linking**

The app supports deep linking for **cold start** and **hot start**.

### URL Scheme

```
historicalplaces://place/:placeId
```

* Example: `historicalplaces://place/5` opens the **PlaceDetails** screen for the place with `id = 5`.

### iOS Simulator

```bash
xcrun simctl openurl booted "historicalplaces://place/5"
```

### Android Emulator

```bash
adb shell am start -W -a android.intent.action.VIEW -d "historicalplaces://place/5" com.mbb_assessment
```

> Make sure your **AndroidManifest.xml** has the correct intent filter and scheme.
> For Android, `launchMode="singleTask"` is required to handle deep links properly.

---

## **Redux & State Management**

* **Redux** stores the list of places and visited IDs.
* **Redux-Observable Epics** handle asynchronous fetches.
* **Visited toggle** updates both UI and Redux state in real-time.

Example reducer logic:

```ts
case TOGGLE_VISITED:
  return {
    ...state,
    visitedIds: state.visitedIds.includes(action.payload)
      ? state.visitedIds.filter((id) => id !== action.payload)
      : [...state.visitedIds, action.payload],
  };
```

---

## **Testing & Verification**

1. Verify places are fetched and displayed correctly.
2. Test marking and unmarking places as visited.
3. Test deep linking: open the app with a URL and verify the correct screen.
4. Navigate back from **PlaceDetails** to **Dashboard**.
5. Test the fun feature (e.g., random suggestion).
6. Check **cross-platform** consistency (iOS and Android).

---

## **Dependencies**

* `react-native`
* `react-redux`
* `redux`
* `redux-observable`
* `@react-navigation/native`
* `@react-navigation/native-stack`
* `react-native-safe-area-context`

---