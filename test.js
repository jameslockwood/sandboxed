import vm from 'node:vm';
import fs from 'fs';
import path from 'path';

// set the following node options (env var) to enable VM module parsing
// export NODE_OPTIONS="--experimental-vm-modules"

const runModule = async ({ location, timeout }) => {
    const timeoutId = setTimeout(() => {
        throw new Error(`module ${location} did not finish within ${timeout}ms.`)
    }, timeout)
    const code = fs.readFileSync(path.resolve(location), 'utf-8');
    const context = {};
    const module = new vm.SourceTextModule(code, context);
    await module.link(() => {});
    await module.evaluate({ timeout, breakOnSigint: true });
    clearTimeout(timeoutId);
}

const go = async () => {
    try {
        await runModule({ location: './test-module.js', timeout: 1000 });
        await runModule({ location: './test-script.js', timeout: 1000 });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

go()