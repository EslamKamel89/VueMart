export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const message = config.sessionPassword ?? "not defined";
  return { message };
});
