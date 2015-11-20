/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
import EventBus from "./EventBus.js";
import Events from '../Events.js'
import FactoryMaker from '../../core/FactoryMaker.js';

export default FactoryMaker.getSingletonFactory(Debug);

function Debug() {

    let instance = {
        log:log,
        setLogTimestampVisible:setLogTimestampVisible,
        setLogToBrowserConsole:setLogToBrowserConsole,
        getLogToBrowserConsole:getLogToBrowserConsole,
    }

    setup();
    return instance;

    let logToBrowserConsole,
        showLogTimestamp,
        //showCalleeName,
        startTime;

    function setup() {
        logToBrowserConsole = true;
        showLogTimestamp = false;
        //showCalleeName = false,
        startTime = new Date().getTime();
    }

    /**
     * Prepends a timestamp in milliseconds to each log message.
     * @param {boolean} value Set to true if you want to see a timestamp in each log message.
     * @default false
     * @memberof Debug#
     */
    function setLogTimestampVisible(value) {
        showLogTimestamp = value;
    }
    /**
     * Prepends the callee object name, and media type if available, to each log message.
     * @param {boolean} value Set to true if you want to see a object name and media type in each log message.
     * @default false
     * @memberof Debug#
     */
    //function showCalleeName(value) {
    //    showCalleeName = value;
    //}
    /**
     * Toggles logging to the browser's javascript console.  If you set to false you will still receive a log event with the same message.
     * @param {boolean} value Set to false if you want to turn off logging to the browser's console.
     * @default true
     * @memberof Debug#
     */
    function setLogToBrowserConsole(value) {
        logToBrowserConsole = value;
    }
    /**
     * Use this method to get the state of logToBrowserConsole.
     * @returns {boolean} The current value of logToBrowserConsole
     * @memberof Debug#
     */
    function getLogToBrowserConsole() {
        return logToBrowserConsole;
    }
    /**
     * This method will allow you send log messages to either the browser's console and/or dispatch an event to capture at the media player level.
     * @param arguments The message you want to log. The Arguments object is supported for this method so you can send in comma separated logging items.
     * @memberof Debug#
     */
    function log() {

        var message = "",
            logTime = null;

        if (showLogTimestamp) {
            logTime = new Date().getTime();
            message += "[" + (logTime - startTime) + "]";
        }

        //if (showCalleeName && this.getName) {
        //    message += "[" + this.getName() + "]";
        //}

        //if (this.getMediaType && this.getMediaType()) {
        //    message += "[" + this.getMediaType() + "]";
        //}

        if (message.length > 0) {
            message += " ";
        }

        Array.apply(null, arguments).forEach(function(item) {
            message += item + " ";
        });

        if (logToBrowserConsole) {
            console.log(message);
        }

        EventBus.trigger(Events.LOG, {message: message});
    }
};