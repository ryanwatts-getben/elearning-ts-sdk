export var Job;
(function (Job) {
    /**
     * Current lifecycle state.
     */
    let status;
    (function (status) {
        status["QUEUED"] = "queued";
        status["RUNNING"] = "running";
        status["SUCCEEDED"] = "succeeded";
        status["FAILED"] = "failed";
        status["CANCELED"] = "canceled";
    })(status = Job.status || (Job.status = {}));
})(Job || (Job = {}));
