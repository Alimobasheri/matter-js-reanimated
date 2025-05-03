# Contributing

## License Agreement

By providing any kind of contribution to this project, **you must agree and be legally entitled** to provide them for use and distribution as a part of this project **wholly under the same terms as in the original included [license](https://github.com/Alimobasheri/matter-js-reanimated/blob/dev/packages/matter-js-reanimated/LICENSE)**.

## Contributions

Contributions by pull request or issues are welcome. Please ensure they follow the same style and architecture as the rest of the code. Please **do not include** any changes to the files in the `build` directory.

Before contributing please read the license agreement described at the beginning of this document.

## Building

To build you must first install [node.js](http://nodejs.org), then run

    yarn install

which will install the required build dependencies, then in order to run the development preview for `matter-tools-reanimated` run

    yarn workspace matter-tools-reanimated run dev

You can add components, hooks, etc to `matter-tools-reaniamted` `/src` folder. And test on development server using a mobile phone.

To build `matter-tools-reaniamted` you can run:
yarn workspace matter-tools-reanimated run dev
But please don't commit change to lib or build folders.
In most cases you won't need to make changes to `matter-js-reaniamted` cor package, but if that's the case, the dev test is a bit tricky here, as for testing changes you'll need to run the above `matter-tools-reanimated` in dev mdoe with `-c` option to clear metro cache:
yarn workspace matter-tools-reanimated run dev -c

## Testing

I haven't implemented any testing solutions yet. Feel free to contribute a solution!
