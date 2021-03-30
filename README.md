# react-async-watcher

React hook to execute and watch async function

<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/react-async-watcher">
    <img alt="" src="https://badgen.net/npm/v/react-async-watcher">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=react-async-watcher">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/react-async-watcher">
  </a>
  <a aria-label="License" href="https://github.com/xralphack/react-async-watcher/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/react-async-watcher">
  </a>
</p>

## Introduction

This package is made for handle asynchronous tasks, such as backend api calls.

* execute async function whenever and whatever you want
* provide execution status and result
* typescript support
* super tiny

## Quick Start

```js
import { useAsyncWatcher } from 'react-async-watcher';

const GetUsersButton = () => {
  const { execute, reset, status, result, error } = useAsyncWatcher();
  
  return (
    <button
      onClick={() => {
        execute(async () => {
          // fetch remote data
          const data = await getUsersApi();
          
          // you may want to post-process data, use redux dispatch and so on
          
          // if return data, result variable will be filled with the data
          return data;
        })
      }}
    >
      Get User List
    </button>
  );
}
```

[Live Demo](https://6dv16.csb.app/)

## Usage

Inside your React or React-Native project directory, run the following command:

```
yarn add react-async-watcher
```

or with npm

```
npm install react-async-watcher
```

### API

```js
const { execute, reset, status, result, error } = useAsyncWatcher();
```

#### useAsyncWatcher

You can pass type to useAsyncWatcher, eq: useAsyncWatcher<number>(), then type of result will be number | undefined

#### execute

```js
execute(async () => {
  // do whatever you want
  
  // if your need to render some data
  // return it, then result variable will hold the data
})
```

#### reset

use it to clear status, result, error

#### status

```js
"initial" | "loading" | "success" | "failure";
```

## License

The MIT License.
