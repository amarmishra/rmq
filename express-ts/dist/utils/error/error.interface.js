"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFound = exports.Forbidden = exports.Unauthorised = exports.HTTPErrorMessage = exports.HTTPErrorStatus = void 0;
var HTTPErrorStatus;
(function (HTTPErrorStatus) {
    HTTPErrorStatus[HTTPErrorStatus["BadRequest"] = 400] = "BadRequest";
    HTTPErrorStatus[HTTPErrorStatus["Unauthorised"] = 401] = "Unauthorised";
    HTTPErrorStatus[HTTPErrorStatus["Forbidden"] = 403] = "Forbidden";
    HTTPErrorStatus[HTTPErrorStatus["NotFound"] = 404] = "NotFound";
    HTTPErrorStatus[HTTPErrorStatus["InternalServerError"] = 500] = "InternalServerError";
})(HTTPErrorStatus || (exports.HTTPErrorStatus = HTTPErrorStatus = {}));
var HTTPErrorMessage;
(function (HTTPErrorMessage) {
    HTTPErrorMessage["BadRequest"] = "BadRequest";
    HTTPErrorMessage["Unauthorised"] = "Unauthorised";
    HTTPErrorMessage["Forbidden"] = "Forbidden";
    HTTPErrorMessage["NotFound"] = "NotFound";
    HTTPErrorMessage["InternalServerError"] = "InternalServerError";
})(HTTPErrorMessage || (exports.HTTPErrorMessage = HTTPErrorMessage = {}));
class HttpError extends Error {
    constructor(status, message = 'Error occured') {
        super();
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpError;
class Unauthorised extends HttpError {
    constructor(message = 'Error occured') {
        super(HTTPErrorStatus.Unauthorised, HTTPErrorMessage.Unauthorised);
        this.message = message;
    }
}
exports.Unauthorised = Unauthorised;
class Forbidden extends HttpError {
    constructor(message = 'Error occured') {
        super(HTTPErrorStatus.Forbidden, HTTPErrorMessage.Forbidden);
        this.message = message;
    }
}
exports.Forbidden = Forbidden;
class NotFound extends HttpError {
    constructor(message = 'Error occured') {
        super(HTTPErrorStatus.NotFound, HTTPErrorMessage.NotFound);
        this.message = message;
    }
}
exports.NotFound = NotFound;
class InternalServerError extends HttpError {
    constructor(message = 'Error occured') {
        super(HTTPErrorStatus.InternalServerError, HTTPErrorMessage.InternalServerError);
        this.message = message;
    }
}
exports.InternalServerError = InternalServerError;
