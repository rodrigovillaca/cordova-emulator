#!/usr/bin/env node

const cliSelect = require("cli-select");
const chalk = require("chalk");
const fs = require("fs");

const commandArgs = process.argv.slice(2).join(' ').trim();
const isIonic = fs.existsSync('./ionic.config.json');

const prefix = isIonic ? 'ionic' : '';

const defaultValueRenderer = (value, selected) => {
    if (selected) {
        return chalk.underline(value);
    }

    return value;
};

const runtimes = [{ name: 'Select a iOS version:' }];

let sim;
const iosVersionSelect = () => {
    const output = require('child_process')
        .execSync(`xcrun simctl list -j`)
        .toString();
    sim = JSON.parse(output);

    sim.runtimes.forEach((runtime) => {
        if (runtime.name.startsWith('iOS ')) {
            runtimes.push(runtime);
        }
    });

    cliSelect({
        values: runtimes,
        valueRenderer: (value, selected) => defaultValueRenderer(value.name, selected)
    }).then((response) => {
        if (response.value.name !== 'Select a iOS version:') {
            selectEmulatorIOS(response.value);
        }
    });
};

const selectEmulatorIOS = (runtime) => {
    const elements = sim.devices[runtime.identifier];
    cliSelect({
        values: elements,
        valueRenderer: (value, selected) => defaultValueRenderer(value.name, selected)
    }).then((response) => {
        const udid = response.value.udid;
        const emulatorCommand = `${prefix} cordova emulate ios --target="${udid}" ${commandArgs}`;
        console.log(`executing: ${emulatorCommand}`);
        const spawn = require('child_process').spawnSync;
        const ls = spawn(emulatorCommand, {
            stdio: 'inherit',
            shell: true
        });
        console.log(ls);

        setTimeout(() => {
            console.log(ls);
            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ls.on('exit', () => {
                console.log('Emulator exited');
            });
        }, 5000);
    });
};

const selectEmulatorAndroid = (emulatorImages, platform) => {
    cliSelect({
        values: emulatorImages,
        valueRenderer: (value, selected) => defaultValueRenderer(value, selected)
    }).then((response) => {
        const spawn = require('child_process').spawn;
        const ls = spawn(`${prefix} cordova emulate ${platform} --target="${response.value}" ${commandArgs}`, {
            stdio: 'inherit',
            shell: true
        });

        ls.on('exit', () => {
            console.log('Emulator exited');
        });
    });
};

const selectPlatform = () => {
    cliSelect({
        values: ['ios', 'android'],
        valueRenderer: (value, selected) => defaultValueRenderer(value, selected)
    })
        .then((response) => {
            const emulatorType = response.value;
            if (emulatorType === 'android') {
                const emulatorImages = require('child_process')
                    .execSync(`./platforms/${emulatorType}/cordova/lib/list-emulator-images`)
                    .toString()
                    .trim()
                    .split('\n');

                selectEmulatorAndroid(emulatorImages, emulatorType);
            } else if (emulatorType === 'ios') {
                iosVersionSelect();
            }
        })
        .catch(() => {
            console.log('cancelled');
        });
};

selectPlatform();
