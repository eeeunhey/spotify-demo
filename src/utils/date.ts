import moment from "moment";

export const formatDate = (date?: string | null) =>
  date ? moment(date).format("YYYY-MM-DD") : "Unknown";

export const formatDuration = (ms?: number) =>
  ms
    ? moment
        .utc(moment.duration(ms).asMilliseconds())
        .format("mm:ss")
    : "00:00";
