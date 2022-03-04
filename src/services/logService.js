// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
//   Sentry.init({
//     dsn: "https://ca3c9a60809b4113bf33e8e70f0c2ff3@o1128609.ingest.sentry.io/6171510",
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0,
//     release: "1-0-0",
//     environment: "development-test",
//   });
}

function log(error) {
//   Sentry.captureException(error);
    console.error(error);
}

let init_log = {
    init,log
}
export default init_log;
