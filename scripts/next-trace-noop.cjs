/* eslint-disable @typescript-eslint/no-require-imports */
const Module = require("node:module");

const originalLoad = Module._load;

const noopReporter = {
  flushAll: async () => {},
  report: () => {}
};

process.env.NEXT_TRACE_UPLOAD_DISABLED = process.env.NEXT_TRACE_UPLOAD_DISABLED || "1";

Module._load = function patchedLoad(request, parent, isMain) {
  const normalizedRequest = typeof request === "string" ? request.replace(/\\/g, "/") : "";
  const parentId =
    parent && typeof parent.id === "string" ? parent.id.replace(/\\/g, "/") : "";

  const isTraceReporterModule =
    normalizedRequest === "./to-json" &&
    parentId.endsWith("/next/dist/trace/report/index.js");

  if (isTraceReporterModule) {
    return {
      __esModule: true,
      default: noopReporter,
      batcher: () => noopReporter
    };
  }

  return originalLoad.call(this, request, parent, isMain);
};

