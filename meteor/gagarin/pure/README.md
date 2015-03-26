https://github.com/anticoders/gagarin

## Installation

    npm install gagarin -g

    meteor add anti:gagarin

## Run

### 1 Launch app

    meteor

### 2 Test app

    gagarin -t 5000


        ➜  pure git:(master) ✗ gagarin -t 5000

          --- building app => /Users/me/projects/laboratory/meteor/gagarin/pure ---


          done building ...



          Example test suite
            ✓ execute should work


          1 passing (2s)


## Caveats

### Too short timeout

        ➜  pure git:(master) ✗ gagarin

          --- building app => /Users/me/projects/laboratory/meteor/gagarin/pure ---


          done building ...



          Example test suite
            1) "before all" hook


          0 passing (2s)
          1 failing

          1) Example test suite "before all" hook:
             Error: timeout of 2000ms exceeded
            at [object Object].<anonymous> (/Users/me/.nvm/v0.11.14/lib/node_modules/gagarin/node_modules/mocha/lib/runnable.js:158:19)
            at Timer.listOnTimeout (timers.js:133:15)



