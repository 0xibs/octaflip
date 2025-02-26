import { ONE_HOUR_IN_SECONDS } from "./constants";

// Function to extract the error message from a JSONRPC error object
export const extractErrorMessageFromJSONRPCError = (errorStr: string) => {
  try {
    // Parse the JSON string into an object
    const errorObj = JSON.parse(errorStr);

    // Access the execution error message
    const executionError = errorObj?.baseError?.data?.execution_error;
    if (!executionError) return "Unknown error";

    // Extract the message inside single quotes using regex
    const match = executionError.match(/'(.*?)'/);
    return match ? match[1] : "Unknown error";
  } catch (e) {
    return "An error occured while parsing JSON-RPC error response";
  }
};

export async function delay(ms: number) {
  if (!ms) return;
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatTime(seconds: number) {
  if (seconds > ONE_HOUR_IN_SECONDS) {
    throw new Error(`Seconds cannot exceed ${ONE_HOUR_IN_SECONDS}`);
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
