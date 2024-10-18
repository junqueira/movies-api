import * as jestCli from 'jest-cli';

try {
    jestCli.run();
} catch(error) {
    console.error(error);
}