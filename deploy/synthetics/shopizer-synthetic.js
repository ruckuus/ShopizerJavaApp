/**
 * Script Name: Shopizer Simple Selenium Script
 * Feel free to explore, or check out the full documentation
 *
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripte d-browsers
 * for details.
 */

/** CONFIGURATIONS **/

// Threshold for duration of entire script - fails test if script lasts longer than X (in ms)
var ScriptTimeout = 180000;
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 30000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

const assert = require('assert'),
    By = $driver.By,
    browser = $browser.manage(),
    targetUrl = "http://dwisupriyadi20-nr-candidate-lab-app.eastus.cloudapp.azure.com:8080"

/** BEGINNING OF SCRIPT **/
var rndString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
console.log('Starting synthetics script: {Untitled Test Case}');
console.log('Default timeout is set to ' + (DefaultTimeout / 1000) + ' seconds');

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && (0 !== UserAgent.trim().length) && (UserAgent != 'default')) {
    $browser.addHeader('User-Agent', UserAgent);
    console.log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities()
    .then(function () { })
    .then(function open() {
        logger.log(1, targetUrl.concat("/shop"));
        return $browser.get(targetUrl.concat("/shop")); })
    .then(function click() {
        logger.log(2, "clickElement id=searchField");
        return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
            .then(function (el) { el.click(); }); })
    .then(function click() {
        logger.log(3, "clickElement id=searchField");
        return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
            .then(function (el) { el.click(); }); })
    .then(function type() {
        logger.log(4, 'sending random string = ' + rndString);
        return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
            .then(function (el) { el.clear(); el.sendKeys(rndString); }); })
    .then(function click() {
        logger.log(5, "clickElement xpath=(.//*[normalize-space(text()) and normalize-space(.)=\'The Book Express\'])[2]/following::button[1]");
        return $browser.waitForAndFindElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='The Book Express'])[2]/following::button[1]"), DefaultTimeout)
            .then(function (el) { el.click(); }); })
    .then(function click() {
        logger.log(6, "clickElement id=searchField");
        return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
            .then(function (el) { el.click(); }); })
    .then(function type() {
        logger.log(7, 'sending random string = ' + rndString);
        return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
            .then(function (el) { el.clear(); el.sendKeys(rndString); }); })
    .then(function click() {
        logger.log(8, "clickElement xpath=(.//*[normalize-space(text()) and normalize-space(.)=\'The Book Express\'])[2]/following::button[1]");
        return $browser.waitForAndFindElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='The Book Express'])[2]/following::button[1]"), DefaultTimeout)
            .then(function (el) { el.click(); }); }) .then(function click() { logger.log(9, "clickElement id=searchField");
            return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
                .then(function (el) { el.click(); }); })
    .then(function type() { logger.log(10, 'sending random string = ' + rndString);
    return $browser.waitForAndFindElement(By.id("searchField"), DefaultTimeout)
        .then(function (el) { el.clear(); el.sendKeys(rndString); }); })
    .then(function click() {
        logger.log(11, "clickElement xpath=(.//*[normalize-space(text()) and normalize-space(.)=\'The Book Express\'])[2]/following::button[1]");
        return $browser.waitForAndFindElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='The Book Express'])[2]/following::button[1]"), DefaultTimeout)
            .then(function (el) { el.click(); }); })
    .then(function () {
        logger.end();
        console.log('Browser script execution SUCCEEDED.');
        },
        function (err) {
        logger.end();
        console.log('Browser script execution FAILED.');
        throw (err);
    });


//** Export Functions
const logger = (function logging(timeout, mode) {
    timeout = timeout || 30000;
    mode = mode || 'production';
    var startTime = Date.now(),
        stepStartTime = Date.now(),
        prevMsg = '',
        prevStep = 0,
        lastStep = 9999;

    function log(thisStep, thisMsg) {
        if (thisStep > prevStep && prevStep != 0) {
            end();
        }

        stepStartTime = Date.now() - startTime;

        if (mode != "production") { stepStartTime = 0; }

        console.log("Step ".concat(thisStep, ": ")
            .concat(thisMsg, " STARTED at ")
            .concat(stepStartTime, "ms."));
        prevMsg = thisMsg;
        prevStep = thisStep;
    }


    function end() {
        var totalTimeElapsed = Date.now() - startTime;
        var prevStepTimeElapsed = totalTimeElapsed - stepStartTime;

        if (mode != 'production') {
            prevStepTimeElapsed = 0;
            totalTimeElapsed = 0;
        }

        console.log("Step ".concat(prevStep, ": ")
            .concat(prevMsg, " FINISHED. It took ")
            .concat(prevStepTimeElapsed, "ms to complete."));

        $util.insights.set("Step ".concat(prevStep, ": ")
            .concat(prevMsg), prevStepTimeElapsed);

        if (timeout > 0 && totalTimeElapsed > timeout) {
            throw new Error('Script timed out. ' + totalTimeElapsed + 'ms is longer than script timeout threshold of ' + timeout + 'ms.');
        }
    }

    return {
        log: log,
        end: end
    };
})(ScriptTimeout)