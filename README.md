NextJS FOUC when using `nohoist` yarn workspaces option on `styled-jsx`

**Steps to reproduce**
1. Clone repo
2. `yarn install`
3. `cd packages/app`
4. `yarn dev`
5. Open `localhost:3000` and view FOUC

**No FOUC**
1. From root of monorepo run `find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +` to remove all node_modules
2. Delete lines 22-24 of root `package.json` (styled-jsx no hoist)
3. `yarn install`
4. `cd packages/app`
5. `yarn dev`
6. Open `localhost:3000` and view no FOUC