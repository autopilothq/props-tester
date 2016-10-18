# props tester
React props are great. Using them a component can interact with outside world easily!
They complain if provided value from a consumer does not match the spec, helping in terms of debugging.
Props also can be used for other purposes as well, take for example component documentation
via prop spec.

They're part of our codebase and we need to write tests to make sure they act
in a way that is expected. It is a kind of tedious task to write tests for them though, that's why we
implemented `props-tester` and we think you should give it a go in your project.

## Installation
Simply use `npm` to download latest version of `props-tester`:
```
npm install --save-dev props-tester
```

## Usage
You can use `props-tester` as part of your test-driven development approach.
`props-tester` is test-runner/test-assertion agnostic so you can use it with
your test runner of choice.

## Hello World
This is a hello world example. It's using `Mocha` as test runner but you should
be able to use any test runner.


This can be an implementation of a `<HelloWorld />` component:
```js
import React from 'react';

const HelloWorld = props => (
  <span>
    {props.hello}
    {props.world}
  </span>
);

HelloWorld.propTypes = {
  hello: React.PropTypes.string.isRequired,
  world: React.PropTypes.string
};

HelloWorld.defaultProps = {
  World: 'The World!'
}

export default HelloWorld;
```

And this is how you can use `props-tester` to test implemented component:
```js
import HelloWorld from './HelloWorld';
import propsTester from 'props-tester';

describe('<HelloWorld />', () => {
  /* your standard unit test */
  it('should do something wonderful', => {
  });

  it('satisfies prop tests', () => {
    const validate = propsTester(describe, it);
    const props = {
      hello: 'Salam',
      world: 'Donya!',
    };

    const policies = {
      hello: { required: true, type: 'string' },
      world: { optional: true, type: 'string' },
    };

    validate(HelloWorld, schema, props);
  });
});
```

This is what we just did to run tests:
 - Created an instance of the `props-tester` module and passed `describe` and `it`
 functions, this allows `props-tester` to run tests using your test runner.

 - Defined a `props` object, our `<HelloWorld />` component will not complain if
 we use `props`. It's prime!

 - Defined expected `policies` for our props.


## API
This module has only one API. To use it, you need to first configure it using:

```jsx
import propsTester from 'props-tester';
const validate = propsTester(descibe, it);
```

 - `describe`: Mandatory function. Usually your test runner comes with `describe`
function as global object, simply pass it.

 - `it`: Mandatory function. Usually your test runner comes with `it` function as
 a global object, simply pass it.


### validate(Component, policies, props);
`validate` function then can be used to validate your component props. It accepts
following params:
 - `Component`: Your React component
 - `policies`: Props policy object (read below for more info)
 - `props`: This is simply a fixture. With this object passed to your component
 as props, component will not fail to be created.


```jsx
import propsTester from 'props-tester';
const validate = propsTester(describe, it);
const props = {
  hello: 'Hello!',
  world: 'World :)',
};
const policies = {
  hello: { required: true, type: 'string'},
  world: { optional: true, type: 'string'},
};
```


## Policy object structure
To use `props-tester`, you need to provide a policy object. A key in `policy` object
refers to a prop in your component and value for a key defines the policy for that prop.

```js
const policy = {
  name: { optional: true, type: 'string' },
  age : { required: true, type: 'number' },
}
```

`policy` object will be translated as following:
 - given component should have a prop called `name`, it should be optional and a string.
 - given component should have a prop called `age`, it should be a required number.


## Policy language
Following keys have special meaning for `props-tester` when provided:
 - `optional`: Prop is optional and without it, component should be rendered.
 - `required`: Prop is required and without it, component should complain.
 - `type`    : Prop expects specific type and it complains if there is a typemismatch.
 `array`, `bool`, `func`, `number`, `oject`, `string` and `symbol` can be passed as value.
 - `instanceOf`: Prop expects value to be instance of a specific class otherwise it complains. Provide
 class implmentation as value
 - `oneOfType`: Prop expects value to be instance of one of defined types. Pass an array of classes as value
 - `oneOf`: Similar to `oneOfType` but instead of class provide type name.
