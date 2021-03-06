# This is no longer maintained here. 
> It has been moved to [angular2-cli][ng2], a Command Line Interface for developing Angular 2 apps.

## Angular-2 Quick start

This repo lets you kick start your Angular-2 app **super fast**.

## Setup


> Install [Node.js].

```sh
$ git clone https://github.com/madhusudhand/angular2-quickstart.git [app_name]
$ cd [app_name]
$ npm install --no-optional
$ npm start
```

**Your are all set !!** and already running your ***Hello Angular*** app :)

> don't have git installed? download as zip.

## Development
Navigate to your project folder and just say `npm start`.
Your browser starts running your app. 

Go to the source and start making changes. When you save, they automatically gets compiled (with [Grunt]) and your browser automatically gets refreshed with new changes.

#### What you can code

* [Angular 2][angular] with [Typescript][ts]
* [Jade] or **HTML** - for html templating
* [SASS] - for CSS styling

#### Why these?

 - Angular 2 is popular with **Typescript** for its elegant features. And recomended language from Angular Team.
 - **Jade**: This quickstart repo is build to work with plain html files or Jade or both. I recomend the use of Jade templating in your apps as your code looks lot more cleaner and you never have to worry about improper closing of tags.
 - **SASS**: Again, keep your code clean and less with SASS styling instead of CSS. Do create the files with ```.scss``` extension even if you are writing plain CSS.

#### App Structure
All your code goes inside

```
your-project/src/app
```

 - Always keep single Component in single file and name it accordingly.
 - Do not create folder structure such as one for `components`, one for `templates`, one for `CSS` etc.
 - Keep the component (`.ts`), its template (`.jade` or `.html`), its styling (`.scss`) and the test files (`.spec.ts`) all in a single folder and name all of them same. [folder and files]
 - Keep the app origanized by creating hierarchy of folders. It is always good idea to limit this hierarchy to atmost 5 levels.
 - Please do refere [John Papa's Angular 2 style-guide][a2sg].

## Source control
If you have cloned the repo then it leaves a `.git` folder in your project.
Delete this folder by running

```sh
$ cd <path/to/project>
$ rm -rf .git
```

Consider taking the following steps to add you project to Git.

```sh
$ git init
$ git add .
$ git commit -m "Initial commit"
```

Create a remote repository for this project on the service of your choice and push the local repo to the remote.

```
$ git remote add origin <repo-address>
$ git push -u origin master
```




### Atom

```
comming soon
```

License
----

[MIT]


   [angular]: <angular.io>
   [ng2]: <https://github.com/madhusudhand/angular2-cli>
   [ut]: <https://docs.angularjs.org/guide/unit-testing>
   [ts]: <http://www.typescriptlang.org>
   [jade]: <http://jade-lang.com>
   [sass]: <http://sass-lang.com>
   [grunt]: <https://gruntjs.com>
   [node.js]: <http://nodejs.org>
   [MIT]: <https://github.com/madhusudhand/angular2-quickstart/blob/master/LICENSE>
   [a2sg]: <https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md>
